var select = document.getElementById("attackSwitchSelect");

var option = document.createElement('option');
option.setAttribute('value', 'Enabled');
option.appendChild(document.createTextNode('Enabled'));
select.appendChild(option);

var option = document.createElement('option');
option.setAttribute('value', 'Disabled');
option.appendChild(document.createTextNode('Disabled'));
select.appendChild(option);

select.onchange('Enabled');

function attackSwitchChanged(select) {
    document.getElementById('attackEnabled').value = select.value;
}

function commentDeletePopup(roundId, commentId) {

    if (confirm('Are you sure you want delete this comment?')) {
        document.getElementById("deleteCommentRoundId").value = roundId;
        document.getElementById("deleteCommentCommentId").value = commentId;
        document.getElementById("commentDeleteForm").submit();
    } 
}

function showProfileCreationForm() {
    document.getElementById("createProfileForm").setAttribute('style', 'display: block;');
    document.getElementById("attackSwitch").setAttribute('style', 'display: none;');
    document.getElementById("showProfileForm").setAttribute('style', 'display: none;');
}

function showProfileDataForm() {
    document.getElementById("createProfileForm").setAttribute('style', 'display: none;');
    document.getElementById("attackSwitch").setAttribute('style', 'display: block;');
    document.getElementById("showProfileForm").setAttribute('style', 'display: block;');
}



