# __Movie-Explorer-Backend__
Backend server for Movie Explorer project. Using The Movie Database to get information about movies and TV shows.

## **REST APIs**

For all APIs, `<media_type>` can only be `tv` or `movie`.

1.  ***`/playing/<media_type>`***<br>
   Get 10 current playing shows.<br>
   __Sample__ <br>
   `/playing/movie`
```json
    [
        {
            "type": "movie",
            "id": 76600,
            "title": "Avatar: The Way of Water",
            "backdrop": "https://image.tmdb.org/t/p/original/1.jpg"
        }
    ]
```

2. ***`/media/<media_type>/<ranking_type>`*** <br>
   Get 40 shows based on media type and ranking.<br>
   `<ranking_type>` can be `trending`, `top_rated` or `popular`.<br>
   __Sample__<br>
   `/media/movie/76600`
```json
    [
        {
            "type": "movie",
            "id": 76600,
            "title": "Avatar: The Way of Water",
            "poster": "https://image.tmdb.org/t/p/original/1.jpg"
        }
    ]
```

1. ***`/search/<query>`*** <br>
   Search shows given query.<br>
   __Sample__<br>
   `<query>` is `"harry"`
```json
    [
        {
            "media_type": "movie",
            "id": 671,
            "type": "movie",
            "title": "Harry Potter and the Philosopher's Stone",
            "backdrop": "https://image.tmdb.org/t/p/original/5jkE2SzR5uR2egEb1rRhF22JyWN.jpg"
        }
    ]
```

1. ***`/video/<media_type>/<id>`*** <br>
   Search trailer of a movie.<br>
   __Sample__<br>
   `/video/movie/76600`
```json
    {
        "status":1,
        "site":"YouTube",
        "type":"Trailer",
        "name":"New Trailer",
        "key":"o5F8MOz_IDw"
    }
```

1. ***`/detail/<media_type>/<id>`*** <br>
   Get details of a movie given type and id.<br>
   __Sample__<br>
   `/detail/movie/76600`
```json
    {
        "title": "Avatar: The Way of Water",
        "date": "2022",
        "runtime": "3hrs 12mins",
        "genres": "Science Fiction, Action, Adventure",
        "lang": "English",
        "overview": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
        "vote": 8.084,
        "tagline": "Return to Pandora.",
        "id": 76600,
        "poster": "https://image.tmdb.org/t/p/w500/94xxm5701CzOdJdUEdIuwqZaowx.jpg"
    }
```

1. ***`/cast/<media_type>/<id>`*** <br>
   Get cast of a movie given type and id.<br>
   __Sample__<br>
   `/cast/movie/76600`
```json
    [
        {
            "name": "Sam Worthington",
            "id": 65731,
            "character": "Jake Sully",
            "profile": "https://image.tmdb.org/t/p/w500/blKKsHlJIL9PmUQZB8f3YmMBW5Y.jpg"
        }
    ]
```

1. ***`/person/<id>`*** <br>
   Get details of a cast using their id.<br>
   __Sample__<br>
   `/person/65731`
```json
    {
        "name": "Sam Worthington",
        "birthday": "1976-08-02",
        "gender": "Male",
        "profile": "https://image.tmdb.org/t/p/w500/blKKsHlJIL9PmUQZB8f3YmMBW5Y.jpg",
        "hometown": "Godalming, Surrey, England, UK",
        "talents": "Acting",
        "otherName": ", Samuel Henry John \"Sam\" Worthington, Σαμ Γουόρθινγκτον, 샘 워싱턴, სემ უორთინგტო",
        "homepage": "https://cinecalidad.uno",
        "biography": "Samuel Henry John Worthington (born 2 August 1976) is a British-Australian actor. He is best known for playing Jake Sully in Avatar, Marcus Wright in Terminator Salvation, and Perseus in Clash of the Titans and its sequel Wrath of the Titans. He later took more dramatic roles, appearing in The Debt (2010), Everest (2015), Hacksaw Ridge (2016), The Shack (2017), Manhunt: Unabomber (2017), and Fractured (2019).\n\nOn television, he appeared in his native Australia as Howard in Love My Way and as Phillip Schuler in the television drama mini-series Deadline Gallipoli, for which he was also an executive producer. He voiced the protagonist, Captain Alex Mason, in the video game Call of Duty: Black Ops (2010), as well as its sequels Call of Duty: Black Ops II (2012), and Call of Duty: Black Ops 4 (2018). In 2022, he starred in the true crime miniseries Under the Banner of Heaven.\n\nIn 2004, Worthington received Australia's highest film award for his lead role in Somersault.",
        "externalIDs": {
            "id": 65731,
            "freebase_mid": "/m/08gfnp",
            "freebase_id": "/en/sam_worthington",
            "imdb_id": "nm0941777",
            "tvrage_id": 32146,
            "wikidata_id": "Q82085",
            "facebook_id": null,
            "instagram_id": null,
            "twitter_id": null
        }
    }
```

1. ***`/review/<media_type>/<id>`*** <br>
   Get reviews of a movie given type and id.<br>
   __Sample__<br>
   `/review/movie/76600`
```json
    [
        {
            "author": "mooney240",
            "content": "**Avatar: The Way of Water follows in its predecessor’s footsteps with stunning effects and a mediocre story.**\r\n\r\nIt’s a James Cameron film, so it’s impressive. The special effects, camerawork, world-building, and action were all off the charts. But Avatar: The Way of Water struggles like its predecessor in the story and character development departments. In fact, the story of The Way of Water is almost identical to the first Avatar. Instead of humans learning to be Na’vi and then fighting Stephen slang, a family of forest Na’vi learns to be ocean Na’vi and then fight Stephen Lang. But the new movie also focuses on a group of annoying teens that constantly get themselves in trouble and peril over and over again throughout the much too long 3+ hour runtime and sidelining better, more established characters. All the strengths and weaknesses of the first movie are back in this one, with the bonus of being compared to the original at every turn. It really is a visual feast and special effects masterpiece, but just like the first Avatar, that’s all it is.",
            "date": "Written by mooney240, on December 16, 2022, 6:48:15 AM",
            "full": "https://www.themoviedb.org/review/639c14af0752880093558e1c",
            "rate": 6,
            "profile": "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg"
        }
    ]
```

1. ***`/recommendation/<media_type>/<id>`*** <br>
   Get 40 recommendations based on a media given type and id.<br>
   __Sample__<br>
   `/recommendation/movie/76600`
```json
    [
        {
            "type": "movie",
            "id": 830784,
            "title": "Lyle, Lyle, Crocodile",
            "poster": "https://image.tmdb.org/t/p/w500/irIS5Tn3TXjNi1R9BpWvGAN4CZ1.jpg"
        }
    ]
```

1.  ***`/similar/<media_type>/<id>`*** <br>
   Get 40 similar shows based on a given type and id.<br>
   __Sample__<br>
   `/recommendation/movie/76600`
```json
    [
        {
            "type": "movie",
            "id": 637,
            "title": "Life Is Beautiful",
            "poster": "https://image.tmdb.org/t/p/w500/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg"
        }
    ]
```