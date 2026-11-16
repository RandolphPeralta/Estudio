import requests

word = input("Enter a word: ")
url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
response = requests.get(url)

if response.status_code != 200:
    print("Word not found.")
else:
    data = response.json()[0]
    print(f"\n{data['word']}")
    for meaning in data['meanings']:
        print(f"\n{meaning['partOfSpeech']}:")
        for item in meaning['definitions'][:2]:
            print("-", item['definition'])