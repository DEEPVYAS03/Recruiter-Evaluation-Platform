import os
import streamlit as st
from pathlib import Path

def save_uploaded_jd(uploads_folder, jd_folder, uploaded_file):
    # Create folders if not exist
    Path(uploads_folder).mkdir(parents=True, exist_ok=True)
    Path(jd_folder).mkdir(parents=True, exist_ok=True)

    file_path = os.path.join(jd_folder, uploaded_file.name)
    with open(file_path, 'wb') as f:
        f.write(uploaded_file.read())

def main():
    st.title("JD Uploader")

    uploaded_file = st.file_uploader("Upload a JD (PDF or DOCX format)", type=["pdf", "docx"])

    ok_button = st.button("OK")

    # Save file on OK button click
    if ok_button and uploaded_file:
        uploads_folder = "uploads"
        jd_folder = os.path.join(uploads_folder, "JD")

        save_uploaded_jd(uploads_folder, jd_folder, uploaded_file)
        st.success("JD successfully uploaded and saved!")

if __name__ == "__main__":
    main()
