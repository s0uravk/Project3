# Import the dependencies.

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect, func
from flask import Flask, json, jsonify, render_template
from config import username, password, host_address

cxn_string = f'postgresql+psycopg2://{username}:{password}@{host_address}/stock_analysis'
# Create the SQLAlchemy engine
engine = create_engine(cxn_string, echo = False)

Base = automap_base()

# Reflect all tables from the database schema
Base.prepare(autoload_with = engine)

# Print the table names
print(Base.classes.keys())

Stocks = Base.classes.Final_Data
Summary = Base.classes.Summary

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1.0/stock_data')
def stock_data():
    session = Session(bind = engine)

    sel = [
        Stocks.Date,
        Stocks.Ticker,
        Stocks.Open,
        Stocks.High,
        Stocks.Low,
        Stocks.Close,
        Stocks.Volume,
        Stocks.Sector,
        Stocks.Industry
        ]
    
    rawData = session.query(*sel)
    session.close()  
    data = {}
    ls = []

    for d in rawData:
        data = {
            'Ticker' : d.Ticker,
            'Date' : d.Date,
            'Open' : d.Open,
            'High' : d.High,
            'Low' : d.Low,
            'Close' : d.Close,
            'Volume' : d.Volume,
            'Industry' : d.Industry,
            'Sector' : d.Sector            
        }
        ls.append(data)
    
    return(jsonify(ls))

@app.route('/api/v1.0/<ticker>/<start>/<end>')
def rangeData(ticker, start, end):
    session = Session(bind = engine)

    sel = [
        Stocks.Date,
        Stocks.Ticker,
        Stocks.Open,
        Stocks.High,
        Stocks.Low,
        Stocks.Close,
        Stocks.Volume,
        Stocks.Sector,
        Stocks.Industry
        ]
    
    rawData = session.query(*sel).filter(Stocks.Ticker == ticker).filter(Stocks.Date >= start).filter(Stocks.Date <= end)

    session.close() 

    data = {}
    ls = []

    for d in rawData:
        data = {
            'Ticker' : d.Ticker,
            'Date' : d.Date,
            'Open' : d.Open,
            'High' : d.High,
            'Low' : d.Low,
            'Close' : d.Close,
            'Volume' : d.Volume,
            'Industry' : d.Industry,
            'Sector' : d.Sector
        }
        ls.append(data)
    
    return(jsonify(ls))

@app.route('/api/v1.0/summary')
def summaryData():
    session = Session(bind = engine)

    sel = [
        Summary.Ticker,
        Summary.Initial_Open,
        Summary.Final_Close,
        Summary.Total_Change,
        Summary.Percentage_Change,
        Summary.Average_Volume,
        Summary.Sector,
        Summary.Industry
        ]
    
    rawData = session.query(*sel)

    session.close()

    data = {}
    ls = []

    for d in rawData:
        data = {
            'Ticker' : d.Ticker,
            'Initial Open' : d.Initial_Open,
            'Final Close' : d.Final_Close,
            'Total Change' : round(d.Total_Change,2),
            'Percentage Change' : f'{round(d.Percentage_Change,2)}%',
            'Average Volume' : round(d.Average_Volume,2),
            'Industry' : d.Industry,
            'Sector' : d.Sector
        }
        ls.append(data)
    
    return(jsonify(ls))

if __name__ == '__main__':
    app.run(debug = True)
    