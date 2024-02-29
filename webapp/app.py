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
Base.prepare(autoload_with= engine)

# Print the table names
print(Base.classes.keys())

Stocks = Base.classes.Final_Data

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1.0/stock_data/close_price')
def close_price():
    session = Session(bind = engine)

    sel = [
        Stocks.Date,
        Stocks.Ticker,
        Stocks.Open,
        Stocks.High,
        Stocks.Low,
        Stocks.Close,
        Stocks.Volume,
        Stocks.Industry,
        Stocks.Sector
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

if __name__ == '__main__':
    app.run(debug = True)