from flask import Flask, render_template
# weather용 
import weather
import pandas as pd

app = Flask(__name__)

# 데이터 가져오기
df = pd.read_excel("data/위경도.xlsx")


@app.route('/')
def home():
  nowWeather = weather.getWeather()
  return render_template('index2.html', weather=nowWeather)


if __name__ == '__main__':
  app.run()
