const destinations = [
  {
    id: 1, name: "Visakhapatnam (RK Beach)", state: "Andhra Pradesh", district: "Visakhapatnam",
    category: "Beach", season: "Oct - Feb", bestMonths: [10, 11, 12, 1, 2],
    image: "Assets/r-k-beach.png",
    short: "The City of Destiny with a beautiful coastline.",
    description: "Vizag is a port city where the Eastern Ghats meet the Bay of Bengal. RK Beach is famous for its sunrise walks and evening breeze.",
    things: "Kailasagiri, Submarine Museum, Rushikonda Beach, Simhachalam Temple",
    reach: "Vizag has its own airport and railway junction, with good bus connectivity.",
    food: "Fresh seafood, Pesarattu, Punugulu"
  },
  {
    id: 2, name: "Araku Valley", state: "Andhra Pradesh", district: "Alluri Sitarama Raju",
    category: "Hill Station", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/Arakus.jpg",
    short: "Misty hills, coffee plantations and tribal culture.",
    description: "Araku is a peaceful hill station in the Eastern Ghats. The train and road journey from Vizag through tunnels and valleys is a highlight itself.",
    things: "Coffee plantations, Tribal Museum, Padmapuram Gardens, Ananthagiri viewpoints",
    reach: "About 110 km from Vizag by road, and there is a scenic train route too.",
    food: "Bamboo chicken, Araku coffee"
  },
  {
    id: 3, name: "Tirupati (Tirumala)", state: "Andhra Pradesh", district: "Tirupati",
    category: "Temple", season: "Sep - Feb", bestMonths: [9, 10, 11, 12, 1, 2],
    image: "Assets/tirupati-balaji.jpg",
    short: "Home of Sri Venkateswara Swamy on the Tirumala hills.",
    description: "One of the most visited pilgrimage places in the world. The temple sits on the seven hills of Tirumala.",
    things: "Darshan at Tirumala, Sri Padmavathi Temple, Kapila Theertham, Chandragiri Fort",
    reach: "Tirupati has an airport and a major railway station. Buses and taxis go up to Tirumala.",
    food: "Tirupati laddu prasadam, temple meals"
  },
  {
    id: 4, name: "Borra Caves", state: "Andhra Pradesh", district: "Alluri Sitarama Raju",
    category: "Nature", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/borra caves.png",
    short: "Million-year-old limestone caves with natural formations.",
    description: "Borra Caves in the Ananthagiri hills are known for stalactites and stalagmites that look like different shapes when lit.",
    things: "Cave walk, Ananthagiri hills, Katiki Waterfalls",
    reach: "Near Araku Valley. Trains from Vizag stop at Borra Guhalu station.",
    food: "Araku coffee, local tribal snacks"
  },
  {
    id: 5, name: "Lepakshi", state: "Andhra Pradesh", district: "Sri Sathya Sai",
    category: "Heritage", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/lapakshi.jpg",
    short: "Vijayanagara art with the famous hanging pillar.",
    description: "The Veerabhadra Temple at Lepakshi is famous for its carvings, paintings and one of the largest monolithic Nandi statues in India.",
    things: "Hanging pillar, giant Nandi, ceiling murals",
    reach: "About 15 km from Hindupur. Bengaluru is the nearest major airport.",
    food: "Andhra meals, Ragi sangati"
  },
  {
    id: 6, name: "Gandikota", state: "Andhra Pradesh", district: "YSR Kadapa",
    category: "Nature", season: "Oct - Feb", bestMonths: [10, 11, 12, 1, 2],
    image: "Assets/Gandikota.jpg",
    short: "The Grand Canyon of India on the Penna river.",
    description: "A deep gorge carved by the Penna river with an old fort on its edge. Sunrise and sunset views here are stunning.",
    things: "Canyon viewpoint, Madhavaraya Temple, Jamia Masjid, camping",
    reach: "Near Jammalamadugu. The nearest railway stations are Kadapa and Yerraguntla.",
    food: "Rayalaseema-style meals, Ragi mudda"
  },
  {
    id: 7, name: "Papikondalu", state: "Andhra Pradesh", district: "Godavari region",
    category: "Nature", season: "Aug - Feb", bestMonths: [8, 9, 10, 11, 12, 1, 2],
    image: "Assets/papikondalu.jpg",
    short: "A calm boat ride through the Godavari gorge.",
    description: "Boats travel between the Papikondalu hills along the Godavari. Water is calm and the hills on both sides look beautiful.",
    things: "Boat cruise, Perantalapalli, tribal villages, river-side camping",
    reach: "Boats start from Rajahmundry and Polavaram area. Check boat timings before travel.",
    food: "River fish curry, Pulasa (in season)"
  },
  {
    id: 8, name: "Amaravati", state: "Andhra Pradesh", district: "Amaravati region",
    category: "Heritage", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/AMARAVATHI.jpg",
    short: "An ancient Buddhist centre on the Krishna river.",
    description: "Amaravati is known for its Buddhist stupa and the Amareswara Temple. It has been an important cultural centre for centuries.",
    things: "Amaravati Stupa, Archaeological Museum, Amareswara Temple, Krishna river ghats",
    reach: "About 35 km from Vijayawada, which has an airport and a major railway junction.",
    food: "Gongura pachadi, Andhra biryani"
  },
  {
    id: 9, name: "Charminar & Old City", state: "Telangana", district: "Hyderabad",
    category: "Heritage", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/charminar.jpg",
    short: "The icon of Hyderabad, built in 1591.",
    description: "Charminar stands in the middle of the old city surrounded by bazaars. Evenings are lively with lights and street food.",
    things: "Laad Bazaar bangles, Mecca Masjid, Chowmahalla Palace, pearls shopping",
    reach: "Well connected by Hyderabad Metro, buses and cabs.",
    food: "Hyderabadi biryani, Irani chai, Osmania biscuits"
  },
  {
    id: 10, name: "Golconda Fort", state: "Telangana", district: "Hyderabad",
    category: "Heritage", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/Golconda-Fort.jpg",
    short: "A grand fort with clever acoustics and sunset views.",
    description: "Golconda was the capital of the Qutb Shahi dynasty. A clap at the entrance can be heard at the top of the fort.",
    things: "Fateh Darwaza clap, Bala Hissar top view, evening sound and light show",
    reach: "About 11 km from central Hyderabad by road or cab.",
    food: "Haleem (in season), Biryani, Double ka meetha"
  },
  {
    id: 11, name: "Ramoji Film City", state: "Telangana", district: "Rangareddy",
    category: "Entertainment", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/ramoji filmcity.jpg",
    short: "A huge film studio complex and theme park.",
    description: "One of the largest film studio complexes in the world, with sets, gardens, shows and rides for a full-day trip.",
    things: "Studio tour, live shows, gardens, rides",
    reach: "About 25 km from central Hyderabad, near Hayathnagar.",
    food: "Food courts inside, Hyderabadi snacks"
  },
  {
    id: 12, name: "Warangal Fort & Thousand Pillar Temple", state: "Telangana", district: "Hanumakonda / Warangal",
    category: "Heritage", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/warangal fort.jpg",
    short: "Kakatiya heritage with stone arches and carvings.",
    description: "Warangal was the capital of the Kakatiyas. The fort has grand stone gateways, and the Thousand Pillar Temple shows beautiful Kakatiya architecture.",
    things: "Kakatiya Kala Thoranam, Thousand Pillar Temple, Bhadrakali Temple, Warangal Fort",
    reach: "About 150 km from Hyderabad. Warangal has a major railway station.",
    food: "Telangana-style meals, Sarva Pindi"
  },
  {
    id: 13, name: "Ramappa Temple", state: "Telangana", district: "Mulugu",
    category: "Temple", season: "Oct - Feb", bestMonths: [10, 11, 12, 1, 2],
    image: "Assets/Ramappa temple.jpg",
    short: "A UNESCO World Heritage Kakatiya temple at Palampet.",
    description: "Ramappa Temple is famous for its detailed sculptures and graceful dancer figures. It became a UNESCO World Heritage Site in 2021.",
    things: "Temple sculptures, Ramappa Lake, nearby Laknavaram Lake",
    reach: "About 200 km from Hyderabad. Warangal is the nearest major city.",
    food: "Local Telangana meals, Jonna rotte"
  },
  {
    id: 14, name: "Bhadrachalam", state: "Telangana", district: "Bhadradri Kothagudem",
    category: "Temple", season: "Oct - Mar", bestMonths: [10, 11, 12, 1, 2, 3],
    image: "Assets/Badhrachalam.jpeg",
    short: "The Sri Sita Ramachandra Swamy temple on the Godavari.",
    description: "A well-known Rama temple on the banks of the Godavari. Ram Navami celebrations here are very special.",
    things: "Temple darshan, Godavari ghat, Parnashala",
    reach: "Nearest railway station is Bhadrachalam Road (Kothagudem). Buses run from Hyderabad and Khammam.",
    food: "Temple prasadam, Godavari fish curry"
  },
  {
    id: 15, name: "Bogatha Waterfalls", state: "Telangana", district: "Mulugu",
    category: "Waterfalls", season: "Jul - Oct", bestMonths: [7, 8, 9, 10],
    image: "Assets/Bogathal-Waterfalls.jpng.webp",
    short: "Often called the Niagara of Telangana.",
    description: "A wide, multi-step waterfall surrounded by forest. It is best visited during and just after the monsoon.",
    things: "Waterfall view, forest walk, photography",
    reach: "Near Cheekupalli in Mulugu district. Road travel from Warangal or Hyderabad is the best option.",
    food: "Carry snacks, local dhabas on the way"
  }
];