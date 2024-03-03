# Import the dependencies.

import sqlalchemy
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

# reflect the tables
Base.prepare(autoload_with= engine)

# Print the table names
print(Base.classes.keys())

# Save reference to Final_Data table
Stocks = Base.classes.Final_Data


#################################################
# Flask Setup
#################################################

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