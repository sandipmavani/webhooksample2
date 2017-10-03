'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
                console.log(requestBody.result.resolvedQuery);
                if(requestBody.result.resolvedQuery == 'Truth')
                {
                    var truth = [
                        'Who is the hottest player?',
                        'Which player is the ugliest player?',
                        'Which player is the funniest?',
                        'Which player is the least funny?',
                        'Who do you fancy?',
                        'Which players boyfriend/girlfriend is the worst looking?',
                        'Which player do you want to have sex with the most?',
                        'Which player has the best ass?',
                        'Which player has the worst ass?',
                        'which player do you dislike the most?',
                        'What annoys you the most about the person to your right?',
                        'Which player has the worst dress sense?',
                        'Which player would you most like a lap dance from?',
                        'Who is the most likely to be nasty in bed?',
                        'What is the weirdest porn category you like to watch?',
                        "Who is most likely to get killed because they have not paid back their drug dealer?",
                        'Who is most likely to become a stripper?',
                        'Who is most likely to fail in life?',
                        'Which players mum is the biggest MILF?',
                        'Who has a Dad you would like to ride like a champion race horse?',
                        'Who has the worst body?',
                        'Who is the most disloyal boyfriend or girlfriend?',
                        'Which players girlfriend or boyfriend is most likely to cheat?',
                        'Who could do with a shower?'
                    ];

                    var shuffleTruth = truth.sort(function (a, b) {return 0.5 - Math.random(); });

                    speech = "";
                    speech += shuffleTruth.pop();
                    return res.json({
                        speech: speech,
                        displayText: speech,
                        source: 'apiai-webhook-sample'
                    });
                }
                if(requestBody.result.resolvedQuery == 'Dare')
                {
                    var dare = [
                        'Suck a players toes for three seconds.',
                        'Kiss the player opposite you for ten seconds on the lips',
                        'Get as many liquids in your kitchen and put them in a cup and down it.',
                        'Pick someone to punch you in the stomach.',
                        'Swap clothes with the person to your left.',
                        'Give anyone a lap dance for 30 seconds.',
                        'Put a players sock in your mouth until your next go.',
                        'Suck on the nipple of person to your left for 5 seconds.',
                        'Spin on the spot or on an office chair as fast as possible until your next go.',
                        'Down the closest unopened or fullest drink within 15 seconds.',
                        'Pretend to be a cat on the lap of the person to you rights lap until your next go.',
                        'Do the cinnamon challenge.',
                        'Allow anyone to post one thing on any social media and keep it up for at least an hour.',
                        'Eat a raw egg',
                        'Lick anyone from their bellybutton to their chin',
                        'Have someone chew a foot of your choice and have them feed you like a bird',
                        'Get dry humped for 30 seconds, prank call someone asking for a lot of money',
                        'Give your phone unlocked to someone else and allow them to do anything for 30 minutes',
                        'Hump a player\'s leg like a horney dog until your next go',
                        'Eat fruit peel',
                        'Have the player to your right hold you in a handstand position until your next go.'
                    ];

                    var shuffleDare = dare.sort(function (a, b) {return 0.5 - Math.random(); });
                    var a = shuffleDare.pop();

                    speech = "";
                    speech += a;
                    return res.json({
                        speech: speech,
                        displayText: speech,
                        source: 'apiai-webhook-sample'
                    });
                }

                else
                {
                    console.log('result: ', speech);

                    return res.json({
                        "speech":"This is a simple response with suggestion chips",
                        "data": {
                            "google":
                                {
                                    "expectUserResponse":true,
                                    "richResponse":
                                        {
                                            "items":
                                                [
                                                    {
                                                        "simpleResponse":
                                                            {
                                                                "textToSpeech":"This is a simple response for with suggestion chips"
                                                            }
                                                    }
                                                ],
                                            "suggestions":
                                                [
                                                    {
                                                        "title":"Truth"
                                                    },
                                                    {
                                                        "title":"Dare"
                                                    }
                                                ]
                                        }
                                }
                        }
                    });
                }
            }
        }


    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});