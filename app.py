from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Στατιστικά
stats = {"wins": 0, "losses": 0, "draws": 0}

# Επιλογές
choices = ["Πέτρα", "Ψαλίδι", "Χαρτί"]


def determine_winner(user_choice, computer_choice):
    """Αποφασίζει τον νικητή."""
    if user_choice == computer_choice:
        stats["draws"] += 1
        return "Ισοπαλία!"
    elif (user_choice == "Πέτρα" and computer_choice == "Ψαλίδι") or \
            (user_choice == "Ψαλίδι" and computer_choice == "Χαρτί") or \
            (user_choice == "Χαρτί" and computer_choice == "Πέτρα"):
        stats["wins"] += 1
        return "Κέρδισες!"
    else:
        stats["losses"] += 1
        return "Έχασες!"


@app.route('/')
def home():
    """Αρχική σελίδα"""
    return render_template('index.html', stats=stats)


@app.route('/play', methods=['POST'])
def play():
    """Παίζει έναν γύρο του παιχνιδιού"""
    user_choice = request.form.get('choice')
    computer_choice = random.choice(choices)
    result = determine_winner(user_choice, computer_choice)
    return jsonify({
        "user_choice": user_choice,
        "computer_choice": computer_choice,
        "result": result,
        "stats": stats
    })


if __name__ == '__main__':
    app.run(debug=True)
