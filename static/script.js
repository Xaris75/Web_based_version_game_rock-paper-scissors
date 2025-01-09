// Στατιστικά που διατηρούνται
const stats = {
    wins: 0,
    losses: 0,
    draws: 0
};

// Συνάρτηση για ενημέρωση εμφάνισης στατιστικών
function updateStatsDisplay() {
    const statsElement = document.getElementById('stats');
    statsElement.textContent = `Νίκες: ${stats.wins}, Ήττες: ${stats.losses}, Ισοπαλίες: ${stats.draws}`;
}

function showDetailedStats() {
    const statsWindow = window.open("", "_blank", "width=400,height=350"); // Άνοιγμα νέου παραθύρου
    if (statsWindow) {
        // Δυναμικό μήνυμα ανάλογα με τα στατιστικά
        let message = "";
        if (stats.wins > stats.losses) {
            message = "Συγχαρητήρια! Είσαι σε καλό δρόμο! 🚀";
        } else if (stats.losses > stats.wins) {
            message = "Μην απογοητεύεσαι! Συνέχισε την προσπάθεια! 💪";
        } else if (stats.wins === stats.losses && stats.wins > 0) {
            message = "Ισορροπία δυνάμεων! Προσπάθησε για περισσότερες νίκες! ⚖️";
        } else {
            message = "Ξεκίνα το παιχνίδι και δείξε τις ικανότητές σου! 🎮";
        }

        statsWindow.document.write(`
            <html>
                <head>
                    <title>Αναλυτικά Στατιστικά</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            background: #f5f5f5;
                            color: #333;
                        }
                        h1 {
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        p {
                            font-size: 18px;
                            margin: 10px 0;
                        }
                        .message {
                            font-size: 20px;
                            margin: 20px 0;
                            color: #ff6f61;
                            font-weight: bold;
                            text-align: center;
                        }
                        button {
                            padding: 10px 20px;
                            background: #ff6f61;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        button:hover {
                            background: #ff4a3e;
                        }
                    </style>
                </head>
                <body>
                    <h1>Αναλυτικά Στατιστικά</h1>
                    <p>Νίκες 🏆: ${stats.wins}</p>
                    <p>Ήττες 💔: ${stats.losses}</p>
                    <p>Ισοπαλίες ⚖️: ${stats.draws}</p>
                    <div class="message">${message}</div>
                    <button onclick="window.close()">Κλείσιμο</button>
                </body>
            </html>
        `);
    } else {
        alert("Δεν μπόρεσε να ανοίξει το νέο παράθυρο. Ελέγξτε τις ρυθμίσεις του προγράμματος περιήγησης.");
    }
}

function play(userChoice) {
    const choices = {
        "Πέτρα": "static/photos/rock.jpg",
        "Ψαλίδι": "static/photos/scissors.jpg",
        "Χαρτί": "static/photos/paper.jpg"
    };

    const computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
    const result = determine_winner(userChoice, computerChoice);

    // Ενημέρωση εικόνων
    document.getElementById('placeholder-message').style.display = 'none'; // Κρύψε το μήνυμα
    document.getElementById('user-image').src = choices[userChoice];
    document.getElementById('computer-image').src = choices[computerChoice];
    document.getElementById('user-image').classList.remove('hidden');
    document.getElementById('computer-image').classList.remove('hidden');
}

function determine_winner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        stats.draws++;
    } else if (
        (userChoice === "Πέτρα" && computerChoice === "Ψαλίδι") ||
        (userChoice === "Ψαλίδι" && computerChoice === "Χαρτί") ||
        (userChoice === "Χαρτί" && computerChoice === "Πέτρα")
    ) {
        stats.wins++;
    } else {
        stats.losses++;
    }

    // Ενημέρωση εμφάνισης στατιστικών
    updateStatsDisplay();

    return userChoice === computerChoice ? "draw" : stats.wins > stats.losses ? "win" : "loss";
}