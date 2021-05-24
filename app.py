from flask import Flask, render_template
# weather용 
import weather

app = Flask(__name__)


@app.route('/')
def home():
  nowWeather = weather.getWeather()
  return render_template('index2.html', weather=nowWeather)


if __name__ == '__main__':
  app.run()
