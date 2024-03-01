# Import the dependencies.

# Import the dependencies.

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect
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
Summary = Base.classes["Summary"]
# total_volume = Base.classes["Total_Volume"] 

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
    
    rawData = session.query(*sel).limit(1000)

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


if __name__ == '__main__':
    app.run(debug = True)
    