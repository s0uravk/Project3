# Import the dependencies.

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
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
        Stocks.Volume
        ]
    
    rawData = session.query(*sel)

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
            'Volume' : d.Volume
        }
        ls.append(data)
    
    session.close()  
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
        Stocks.Volume
        ]
    
    rawData = session.query(*sel).filter(Stocks.Ticker == ticker).filter(Stocks.Date >= start).filter(Stocks.Date <= end)

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
            'Volume' : d.Volume
        }
        ls.append(data)
    
    session.close()  
    return(jsonify(ls))

@app.route('/api/v1.0/summary')
def summaryData():
    session = Session(bind = engine)
    start_date = session.query(func.min(Stocks.Date))
    end_date = session.query(func.max(Stocks.Date))

    tickers = session.query(Stocks.Ticker).filter(Stocks.Date == start_date).all()
    session.close()

    data = []

    for ticker in tickers:
        ticker_data = {}
        ticker_data['Ticker'] = ticker[0]
        
        initial_open = session.query(Stocks.Open).filter(Stocks.Date == start_date, Stocks.Ticker == ticker[0]).first()
        final_close = session.query(Stocks.Close).filter(Stocks.Date == end_date, Stocks.Ticker == ticker[0]).first()
        avg_volume = session.query(func.avg(Stocks.Volume)).filter(Stocks.Ticker == ticker[0]).first()
        
        ticker_data['Initial Open'] = round(initial_open[0], 2) if initial_open else None
        ticker_data['Final Close'] = round(final_close[0], 2) if final_close else None
        ticker_data['Total Change'] = round((final_close[0] - initial_open[0]), 2) if initial_open and final_close else None
        ticker_data['Percentage Change'] = "{:.2f}%".format(((final_close[0] - initial_open[0])*100)/ initial_open[0]) if initial_open and final_close else None
        ticker_data['Average Volume'] = round(avg_volume[0], 2) if avg_volume else None
        
        data.append(ticker_data)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug = True)
    