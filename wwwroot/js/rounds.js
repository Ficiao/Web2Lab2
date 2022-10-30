var tableRounds = document.getElementById("tableRounds"), roundsRowIndex;

for (var i = 1; i < tableRounds.rows.length; i++) {
    tableRounds.rows[i].onclick = function () {
        roundsRowIndex = this.rowIndex;
        console.log(roundsRowIndex);
       
        document.getElementById("firstTeam").value = this.cells[0].innerHTML;
        document.getElementById("secondTeam").value = this.cells[1].innerHTML;
        document.getElementById("teamOneGoals").value = this.cells[2].innerHTML != "" ? this.cells[2].innerHTML : -1;
        document.getElementById("teamTwoGoals").value = this.cells[3].innerHTML != "" ? this.cells[3].innerHTML : -1;
        document.getElementById("matchId").value = roundsRowIndex - 1;
    };
}

var select = document.getElementById("roundNumberSelect");
var TextInsideLi = document.getElementById('textJson').innerHTML;
var json = JSON.parse(TextInsideLi);
var numberOfRounds = Object.keys(json.rounds).length;
for (var i = 1; i <= numberOfRounds; i++) {
    var option = document.createElement('option');
    option.setAttribute('value', i);
    option.appendChild(document.createTextNode(i));
    select.appendChild(option);
} 

function roundSelectedChanged(selectedRound) {
    var numberOfMatches = Object.keys(json.rounds[0].matches).length;

    var round = selectedRound.value - 1;
    document.getElementById('roundId').value = round;
    for (var i = 1; i <= numberOfMatches; i++) {
        tableRounds.rows[i].cells[0].innerHTML = json.rounds[round].matches[i - 1].firstTeam;
        tableRounds.rows[i].cells[1].innerHTML = json.rounds[round].matches[i - 1].secondTeam;
        var goals;
        goals = json.rounds[round].matches[i - 1].goalsFirstTeam;
        tableRounds.rows[i].cells[2].innerHTML = goals >= 0 ? goals : "";
        goals = json.rounds[round].matches[i - 1].goalsSecondTeam;
        tableRounds.rows[i].cells[3].innerHTML = goals >= 0 ? goals : "";
    }
}

select.onchange(1);
tableRounds.rows[1].onclick();

function editRoundsRow() {
    if (roundsRowIndex == null)
    {
        roundsRowIndex = 1;
    }

    tableRounds.rows[roundsRowIndex].cells[0].innerHTML = document.getElementById("firstTeam").value;
    tableRounds.rows[roundsRowIndex].cells[1].innerHTML = document.getElementById("secondTeam").value;
    tableRounds.rows[roundsRowIndex].cells[2].innerHTML = document.getElementById("teamOneGoals").value;
    tableRounds.rows[roundsRowIndex].cells[3].innerHTML = document.getElementById("teamTwoGoals").value;
}

var isOn = false;

function editRoundsTable() {
    if (isOn) {
        isOn = false;
        document.querySelector('.editTable').setAttribute('style', 'display: none;')
    }
    else {
        isOn = true;
        document.querySelector('.editTable').setAttribute('style', 'display: block;');
    }
}



