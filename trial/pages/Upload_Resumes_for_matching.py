import os
import streamlit as st
from pathlib import Path

def save_uploaded_resumes(uploads_folder, resumes_folder, uploaded_files):
    # Create folders if not exist
    Path(uploads_folder).mkdir(parents=True, exist_ok=True)
    Path(resumes_folder).mkdir(parents=True, exist_ok=True)

    for file in uploaded_files:
        file_path = os.path.join(resumes_folder, file.name)
        with open(file_path, 'wb') as f:
            f.write(file.read())

def main():
    st.title("Resume Uploader")

    uploaded_files = st.file_uploader("Upload multiple resumes (PDF format)", type=["pdf"], accept_multiple_files=True)
    ok_button = st.button("OK")

    # Save files on OK button click
    if ok_button and uploaded_files:
        uploads_folder = "uploads"
        resumes_folder = os.path.join(uploads_folder, "resumes")

        save_uploaded_resumes(uploads_folder, resumes_folder, uploaded_files)
        st.success("Resumes successfully uploaded and saved!")

        # Clear the uploaded files list
        uploaded_files.clear()

if __name__ == "__main__":
    main()
