# Import the dependencies.

# Import the dependencies.

import numpy as np
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from config import username, password, host_address

cxn_string = f'postgresql+psycopg2://{username}:{password}@{host_address}/stock_analysis'

# Create SQLAlchemy engine
engine = create_engine(cxn_string, echo = False)
Base = automap_base()

# Reflect all required tables from the database schema
Base.prepare(autoload_with = engine)

total_volume = Base.classes["Total_Volume"] 

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1.0/total_volume')
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
        data = {
        'Year' : d.year,
        'Ticker': d.ticker,
        'Total_Volume': d.total_volume,
        'Sector': d.sector
        }
        vol_list.append(data)
    
    session.close()
    return(vol_list)
    


if __name__ == '__main__':
    app.run(debug = True)
    