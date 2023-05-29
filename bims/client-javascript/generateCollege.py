import csv
import requests

# Function to make the signup API call


def call_signup_api(name, email, no):
    # Replace with the actual API endpoint URL
    url = "http://localhost:3000/auth/signup"

    # Prepare the request body
    payload = {
        "name": name,
        "email": email,
        "password": "test123",
        "aadharno": no,
        "role": 1
    }

    # Make the POST request
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print(f"Signed up successfully for {name} ({email})")
    else:
        print(f"Failed to sign up for {name} ({email})")


# Read the CSV file and make API calls
with open('college.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        name = row['Name']
        email = row['Email']
        no = row['CollegeNo']
        print(f"Signing up {name} ({email})")
        call_signup_api(name, email, no)
