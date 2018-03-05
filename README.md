# meetup
Automation to e-mail Stone Summit Meetup RSVP list every Monday.
Use Cron to schedule invoke of runScript.sh every Monday at 4PM
Use dotenv to retrieve private Meetup API key stored locally, and email credentials. See `example.env`
Use nodemailer to send email notification 
Use the following Meetup APIs:

    1) https://api.meetup.com/:urlname/events/ - to find today's event ID where urlname = Atlanta-Outdoor-Club-South
    Example Response:
```
{  
   "0":{  
      "created":1467323781000,
      "id":"hgdsvlyxfbhb",
      "name":"Indoor Climbing at Stone Summit",
      "status":"upcoming",
      "time":1520290800000,
      "local_date":"2018-03-05",
      "local_time":"18:00",
      "updated":1467323781000,
      "utc_offset":-18000000,
      "waitlist_count":0,
      "yes_rsvp_count":7,
      "link":"https://www.meetup.com/Atlanta-Outdoor-Club-South/events/247187681/",
      "description":"<p>Whether you are a beginner or a world-class athlete, we have a climb for you. Stone Summit has walls extending 25 feet to 60 feet high to challenge both your strength and mind, a bouldering room that will not bore even the most fanatical gym rats. If you would like to learn how to belay let me know I will get there a little early to help someone or find someone in the group who wouldn't mind helping.  If you're brand new to climbing, don't feel pressured to learn to belay.  We have plenty of people to belay you.</p> <p><br/>Stone Summit has agreed to give us a discounted rate of $10.00 ($11.00 after May 1st) which includes the harness and shoe rental if you need it.</p> ",
      "how_to_find_us":"Check in at the front desk",
      "visibility":"public"
   }
}
```
    2) https://api.meetup.com/:urlname/events/:event_id/rsvps - to find the list of RSVPs for today's meeting
    Example Response:
```
{  
   "0":{  
      "created":1516975450000,
      "updated":1516975450000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":1880493650,
         "name":"Brett",
         "role":"event_organizer",
         "event_context":{  
            "host":true
         }
      }
   },
   "1":{  
      "created":1519783821000,
      "updated":1519783821000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":2424525372,
         "name":"Emma",
         "event_context":{  
            "host":false
         }
      }
   },
   "2":{  
      "created":1518549849000,
      "updated":1518549849000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":2454456089,
         "name":"Krista",
         "event_context":{  
            "host":false
         }
      }
   },
   "3":{  
      "created":1519742158000,
      "updated":1519742158000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":2043546987,
         "name":"Michael",
         "event_context":{  
            "host":false
         }
      }
   },
   "4":{  
      "created":1516975450000,
      "updated":1517782902000,
      "response":"no",
      "guests":0,
      "member":{  
         "id":85f17310,
         "name":"Micki",
         "event_context":{  
            "host":true
         }
      }
   },
   "5":{  
      "created":1519742431000,
      "updated":1519742431000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":2369269j58,
         "name":"Quinn",
         "event_context":{  
            "host":false
         }
      }
   },
   "6":{  
      "created":1519788604000,
      "updated":1519788604000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":2311710857,
         "name":"Yue",
         "event_context":{  
            "host":false
         }
      }
   },
   "7":{  
      "created":1516975450000,
      "updated":1516975450000,
      "response":"yes",
      "guests":0,
      "member":{  
         "id":1145511652,
         "name":"Zack S.",
         "event_context":{  
            "host":false
         }
      }
   }
}
```


