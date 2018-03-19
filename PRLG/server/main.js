import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertPatient(patientSurName, patientLastName, diagnosis, age, createdBy, createdAt){
		Patientlist.insert({
			patientSurName: patientSurName,
			patientLastName: patientLastName, 
			diagnosis: diagnosis, 
			age: age,
			createdBy: createdBy,
			createdAt: createdAt
		});
	},
	insertTherapist(therapistSurName, therapistLastName, anrede, createdBy, createdAt){
		Therapists.insert({
			therapistSurName: therapistSurName,
			therapistLastName: therapistLastName,
			anrede: anrede,
			createdBy: createdBy,
			createdAt:createdAt
		});
	},
	insertMaterial(materialName, partOf, category, creator, typ){
		Materials.insert({
			materialName: materialName, 
			partOf: partOf,
			category: category,
			creator: creator,
			typ: typ
		});
	},
	displayMemory(){
		console.log("wir kommen in die Funktion hinein");
	    let card = document.getElementsByClassName("card");
	    let cards = [...card];
	    for (var i=0; i < cards.length; i++){
	        cards[i].addEventListener("click", displayCard);
	    };
	    var displayCard = function(){
	        this.classList.toggle("open");
	        this.classList.toggle("show");
	        this.classList.toggle("disabled");
	    }
	    var shuffle = function(array){
	        var currentIndex = array.length, temporaryValue, randomIndex;
	        while(currentIndex !== 0){
	            randomIndex = Math.floor(Math.random()*currentIndex);
	            currentIndex -= 1;
	            temporaryValue = array[currentIndex];
	            array[currentIndex] = array[randomIndex];
	            array[randomIndex] = temporaryValue;
	        }
	        return array;
	    }

		console.log("es wurde geshuffled");
	    const deck = document.querySelector(".deck");
	    function startGame(){
	        var shuffledCards = shuffle(cards);
	        for(var i=0; i<shuffledCards.length; i++){
	            [].forEach.call(shuffledCards, function(item){
	                deck.appendChild(item);
	            });
	        }
	    }

		console.log("wir starten gleich das Spiel");
	    startGame();

		console.log("Spiel gestartet");
	}

});

Meteor.publish('patients', function(){
    var currentUser = this.userId;
    return Patientlist.find({ createdBy: currentUser });
});

Meteor.publish('therapists', function(){
    var currentUser = this.userId;
    return Therapists.find({ createdBy: currentUser });
});

Meteor.publish('materials', function(){
    //var currentUser = this.userId;
    return Materials.find({});
});