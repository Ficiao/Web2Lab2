var select = document.getElementById("roundNumberSelect");
var TextInsideLi = document.getElementById('textJson').innerHTML;
var json = JSON.parse(TextInsideLi);
var numberOfRounds = Object.keys(json.rounds).length;
var numberOfMatches = Object.keys(json.rounds[0].matches).length;
var tableRounds = document.getElementById("tableRounds"), roundsRowIndex;
var tableComments = document.getElementById("tableComments");
var userId = document.getElementById("userIdJson").innerHTML;
var role = document.getElementById("userRoleJson").innerHTML;
var userRole = role == "admin" ? 2 : role == "user" ? 1 : 0;

//Setup for filling round selector
for (var i = 1; i <= numberOfRounds; i++) {
    var option = document.createElement('option');
    option.setAttribute('value', i);
    option.appendChild(document.createTextNode(i));
    select.appendChild(option);
}

function commentEditFormShow(roundId, commentId) {
    showCreateCommentForm();
    document.getElementById('editCommentCommentId').value = commentId;
}

function commentDeletePopup(roundId, commentId) {

    if (confirm('Are you sure you want delete this comment?')) {
        document.getElementById("deleteCommentRoundId").value = roundId;
        document.getElementById("deleteCommentCommentId").value = commentId;
        document.getElementById("commentDeleteForm").submit();
    } 
}

//Function to create round table rows and initialize their onclick
function createRoundsTableRows(roundId) {
    tableRounds.innerHTML = tableRounds.rows[0].innerHTML;
    for (var i = 0; i < Object.keys(json.rounds[roundId].matches).length; i++) {
        var row = tableRounds.insertRow(i + 1);
        for (var j = 0; j < 4; j++) {
            row.insertCell(0);
        }
    }

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
}

function createCommentsTableRos(roundId) {
    tableComments.innerHTML = tableComments.rows[0].innerHTML;
    for (var i = 0; i < Object.keys(json.rounds[roundId - 1].comments).length; i++) {
        var row = tableComments.insertRow(i + 1);
        var numberOfColums = userRole == 2 ? 4 : userRole == 1 ? 5 : 3;
        for (var j = 0; j < numberOfColums; j++) {
            row.insertCell(0);
        }
    }
}

//Function for changing round selection
function roundSelectedChanged(selectedRound) {
    createRoundsTableRows(selectedRound.value);
    createCommentsTableRos(selectedRound.value);
    var round = selectedRound.value - 1;
    document.getElementById('roundId').value = round;
    document.getElementById('editCommentRoundId').value = round;

    for (var i = 1; i <= numberOfMatches; i++) {
        tableRounds.rows[i].cells[0].innerHTML = json.rounds[round].matches[i - 1].firstTeam;
        tableRounds.rows[i].cells[1].innerHTML = json.rounds[round].matches[i - 1].secondTeam;
        var goals;
        goals = json.rounds[round].matches[i - 1].goalsFirstTeam;
        tableRounds.rows[i].cells[2].innerHTML = goals >= 0 ? goals : "";
        goals = json.rounds[round].matches[i - 1].goalsSecondTeam;
        tableRounds.rows[i].cells[3].innerHTML = goals >= 0 ? goals : "";
    }

    var numberOfComments = Object.keys(json.rounds[round].comments).length;
    for (var i = 1; i <= numberOfComments; i++) {
        tableComments.rows[i].cells[0].innerHTML = json.rounds[round].comments[i - 1].ownerId;
        tableComments.rows[i].cells[1].innerHTML = json.rounds[round].comments[i - 1].commentText;
        tableComments.rows[i].cells[2].innerHTML = json.rounds[round].comments[i - 1].timeCreated;
        if (userRole > 0) {
            if (userId != json.rounds[round].comments[i - 1].ownerId && userRole == 1) continue;
            var privButton = document.createElement('button');
            privButton.type = "button";
            privButton.className = "updateBtn";
            privButton.innerHTML = 'Delete';
            var parameter = i - 1;
            CreateCommentButtonEditCallback(privButton, round, parameter);
            tableComments.rows[i].cells[3].appendChild(privButton);
        }
        if (userRole == 1) {
            if (userId != json.rounds[round].comments[i - 1].ownerId) continue;
            var privButton = document.createElement('button');
            privButton.type = "button";
            privButton.className = "updateBtn";
            privButton.innerHTML = 'Edit';
            var parameter = i - 1;
            CreateCommentButtonDeleteCallback(privButton, round, parameter);
            tableComments.rows[i].cells[4].appendChild(privButton);
        }
    }
}

function CreateCommentButtonEditCallback(privButton, round, parameter) {
    privButton.onclick = function func2() {
        commentDeletePopup(round, parameter)
    };
}

function CreateCommentButtonDeleteCallback(privButton, round, parameter) {
    privButton.onclick = function func2() {
        commentEditFormShow(round, parameter)
    };
}

//Initialize selected data
select.onchange(1);
tableRounds.rows[1].onclick();

//Function to show or hide rounds table edit form
var isRoundsFormOn = false;
function editRoundsTable() {
    if (isRoundsFormOn) {
        isRoundsFormOn = false;
        document.getElementById("editRoundsForm").setAttribute('style', 'display: none;')
    }
    else {
        isRoundsFormOn = true;
        document.getElementById("editRoundsForm").setAttribute('style', 'display: block;');
    }
}

var isCreateCommentsFormOn = false;
function showCreateCommentForm() {
    if (isCreateCommentsFormOn) {
        isCreateCommentsFormOn = false;
        document.getElementById("editCommentForm").setAttribute('style', 'display: none;');
    }
    else {
        isCreateCommentsFormOn = true;
        document.getElementById("editCommentForm").setAttribute('style', 'display: block;');
        document.getElementById('editCommentCommentId').value = -1;
    }
}


