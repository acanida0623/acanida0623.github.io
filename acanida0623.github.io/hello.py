from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dice/<number>/<side>')
def lines(number,side):
    dice_rolled = 2



    return '<h2>{res}</h2>'.format(res=dice_rolled)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
