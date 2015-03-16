Template.api.helpers({
  example_list: function makeExamplePetitionList () {
    var response = [
      {
        author: "Gabriel Perez",
        submitted: 1409767345903,
        title: "Build more affordable, on-campus housing.",
        description: "As there is only enough housing for half the student population, it creates a challenge to find affordably priced off-campus housing.",
        votes: 50,
        _id: "PYwoRCiAQsWa365af",
        response: "Hi Gabe, thank you for your response. I have reached out to the Director of Housing Operations with your concerns. We will be posting the official response shortly. Thank you. -- Kyle Keraga, RPI Student Senate",
        responded_at: 1411139919817,
        minimumVotes: 25
      },
      {
        author: "Michael Cuozzo",
        submitted: 1410112945911,
        title: "Extend hours for RPI Computer Labs at peak times.",
        description: "Students often work late near the end of semester; extended lab time will allow more students to utilize this on-campus resource.",
        votes: 4,
        _id: "bDA8ynBMErm9NLaqj",
        minimumVotes: 25
      }
    ];
    return JSON.stringify(response, undefined, 2);
  },
  example_individual: function makeExamplePetition () {
    var response = {  
       author: "Justin Etzine",
       submitted: 1410112945911,
       title: "Extend hours for RPI Computer Labs at peak times.",
       description: "Students often work late near the end of semester; extended lab time will allow more students to utilize this on-campus resource.",
       votes: 4,
       _id: "bDA8ynBMErm9NLaqj",
       minimumVotes: 25,
       signers:[  
          "JE",
          "GP",
          "KK",
          "MC"
       ],
       history:[  
          {  
             created_at: 1410112945912,
             votes: 1,
             _id: "ibdMPcGaS5gGmBEha"
          },
          {  
             created_at: 1410199345913,
             votes: 2,
             _id: "5bw2TeyDK48XcqSiw"
          },
          {  
             created_at: 1410285745914,
             votes: 4,
             _id: "jZu2D26gwRcZExFy2"
          }
       ]
    };
    return JSON.stringify(response, undefined, 2);
  }
});