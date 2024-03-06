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

Industry_Volume = Base.classes.Industry_Volume

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1.0/stock_data/sector_volume')
def sector_volume():
    session = Session(bind = engine)
    sel = [
      	Industry_Volume.sector,
        Industry_Volume.industry,
	Industry_Volume.total_volume
        ]
    rawData = session.query(*sel)
    session.close()
    data = {}
    ls = []
    for d in rawData:
        data = {
            'Industry' : d.industry,
            'Sector' : d.sector,
	    'Total_Volume' : d.total_volume
        }
        ls.append(data)
    return(jsonify(ls))

if __name__ == '__main__':
    app.run(debug = True)
    