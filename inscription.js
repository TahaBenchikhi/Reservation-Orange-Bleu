var request = require('request');
function startIscription() {
var options = {
  'method': 'POST',
  'url': 'https://www.lorangebleue-resa.fr/system/controller/ajaxFront.php',
  'headers': {
    'Cookie': 'b55f2091e88c1a5f2db84c7d49f63fcb=89f5d7578bd40f544a5175f47c27e97d'
  },
  formData: {
    'type': 'getListCours'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  try {
      const premier_cours = JSON.parse(response.body)[0] // choisir le numéro du cours 0 pour premier, 1 deuxieme, ...
      const premier_cours_id = premier_cours.id
      sendInscription(premier_cours_id);
  } catch (e) {
      setTimeout(() => {
        console.log("Attente d'ouverture des inscriptions ...");
        startIscription();
      }, "3000")
  }
});

}
function sendInscription(id) {
var options = {
  'method': 'POST',
  'url': 'https://www.lorangebleue-resa.fr/system/controller/ajaxFront.php',
  'headers': {
    'Cookie': 'b55f2091e88c1a5f2db84c7d49f63fcb=89f5d7578bd40f544a5175f47c27e97d'
  },
  formData: {
    'type': 'setInscription',
    'data': '{"firstname":"benchikhi","lastname":"Taha","tel":"0769123597","email":"benchikhio.taha@gmail.com","creneauCoursId":'+id+'}'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  if (response.body.length == 0) 
    {
      setTimeout(() => {
        console.log("Attente de libération d'une place ...");
        sendInscription(id);
      }, "3000")
    } else   if (response.body.length > 0) {
      console.log('************* :) Inscription avec succes');
      console.log(response.body);
    } 
});
}

startIscription();