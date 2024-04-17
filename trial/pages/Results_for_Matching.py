import pandas as pd
import streamlit as st

# Define a function to load and cache the data

def load_data():
    # Load the result_df from the CSV file
    result_df = pd.read_csv('result_df.csv')
    return result_df

# Load the data using the function
result_df = load_data()

# Display the first 5 Resume IDs as headings
st.title("Top 5 Shortlisted Resumes:")
for resume_id in result_df['ResumeID'].head():
    st.header(resume_id)
