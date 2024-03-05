# Import the dependencies.

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from config import username, password, host_address


#################################################
# Database Setup
#################################################

cxn_string = f'postgresql+psycopg2://{username}:{password}@{host_address}/stock_analysis'
# Create the SQLAlchemy engine
engine = create_engine(cxn_string, echo = False)

# reflect an existing database into a new model
Base = automap_base()

# Reflect all required tables from the database schema
Base.prepare(autoload_with = engine)

# Print the table names
print(Base.classes.keys())

Stocks = Base.classes.Final_Data
Summary = Base.classes.Summary
total_volume = Base.classes["Total_Volume"] 

app = Flask(__name__)


# #################################################
# # Flask Routes
# #################################################

@app.route('/')
def index():
    return render_template('index.html')


#the following route returns a JSON list of the close prices from the table
@app.route('/api/v1.0/stock_data/close_price')
def close_price():

    # Create a session (link) from Python to the DB
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

    data = {}
    my_list = []

    for d in rawData:
        data = {
            'Ticker' : d.Ticker,
            'Date' : d.Date,
            'Close' : d.Close,
            'Industry' : d.Industry,
            'Sector' : d.Sector            
        }
        my_list.append(data)

    session.close()  
    return(jsonify(my_list))

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

@app.route('/api/v1.0/stock_data/<ticker>/<start>/<end>')
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
            'Volume' : d.Volume,
            'Industry' : d.Industry,
            'Sector' : d.Sector
        }
        ls.append(data)
        
@app.route('/api/v1.0/stock_data/moving_average')
def moving_average():
    session = Session(bind = engine)
    mv_data = [
        Stocks.Close,
        Stocks.Date
    ]

    data = session.query(*mv_data)

    mv_list = []
    for d in data:
        data1 = {
            "Date": d.Date,
            "Close_Price": d.Close
        }
        mv_list.append(data1)
    session.close()
    return (jsonify(mv_list))

@app.route('/api/v1.0/stock_data/total_volume')
def stock_data():
    session = Session(bind = engine)

    vol_data = [
    total_volume.year, 
    total_volume.ticker,
    total_volume.total_volume,
    total_volume.sector
    ]
    data = session.query(*vol_data)

    vol_list = []

    for d in data:
        data1 = {
        'Year' : d.year,
        'Ticker': d.ticker,
        'Total_Volume': d.total_volume,
        'Sector': d.sector
        }
        vol_list.append(data1)
    
    return(jsonify(vol_list))

@app.route('/api/v1.0/stock_data/summary')
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