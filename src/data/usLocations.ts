// Complete list of all 50 US States + District of Columbia and their major cities/towns

export interface StateInfo {
  code: string;
  name: string;
  cities: string[];
}

export const US_STATES: StateInfo[] = [
  {
    code: "AL",
    name: "Alabama",
    cities: [
      "Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa",
      "Hoover", "Auburn", "Dothan", "Decatur", "Madison", "Florence",
      "Gadsden", "Vestavia Hills", "Prattville", "Phenix City", "Alabaster",
      "Bessemer", "Enterprise", "Opelika", "Athens", "Northport", "Pelham",
      "Trussville", "Daphne", "Albertville", "Oxford", "Fairhope", "Anniston"
    ],
  },
  {
    code: "AK",
    name: "Alaska",
    cities: [
      "Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan", "Wasilla",
      "Kenai", "Kodiak", "Bethel", "Palmer", "Homer", "Unalaska", "Barrow (Utqiagvik)",
      "Soldotna", "Valdez", "Nome", "Kotzebue", "Seward", "Wrangell", "Dillingham"
    ],
  },
  {
    code: "AZ",
    name: "Arizona",
    cities: [
      "Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale",
      "Gilbert", "Tempe", "Peoria", "Surprise", "Yuma", "Avondale",
      "Goodyear", "Flagstaff", "Buckeye", "Lake Havasu City", "Catalina Foothills",
      "Casa Grande", "Maricopa", "Oro Valley", "Prescott", "Bullhead City",
      "Prescott Valley", "Apache Junction", "Queen Creek", "Marana", "El Mirage", "Kingman", "Sedona"
    ],
  },
  {
    code: "AR",
    name: "Arkansas",
    cities: [
      "Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro",
      "Rogers", "Conway", "North Little Rock", "Bentonville", "Pine Bluff",
      "Hot Springs", "Benton", "Texarkana", "Sherwood", "Jacksonville",
      "Russellville", "Bella Vista", "West Memphis", "Paragould", "Cabot",
      "Searcy", "Van Buren", "El Dorado", "Maumelle", "Bryant", "Blytheville"
    ],
  },
  {
    code: "CA",
    name: "California",
    cities: [
      "Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno",
      "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim",
      "Stockton", "Riverside", "Irvine", "Santa Ana", "Chula Vista",
      "Fremont", "Santa Clarita", "San Bernardino", "Modesto", "Moreno Valley",
      "Fontana", "Oxnard", "Huntington Beach", "Glendale", "Santa Clarita",
      "Ontario", "Elk Grove", "Santa Rosa", "Rancho Cucamonga", "Oceanside",
      "Garden Grove", "Lancaster", "Palmdale", "Salinas", "Hayward", "Sunnyvale",
      "Escondido", "Pomona", "Bellevue", "Torrance", "Pasadena", "Orange",
      "Fullerton", "Roseville", "Visalia", "Concord", "Thousand Oaks", "Santa Clara",
      "Simi Valley", "Berkeley", "Kentfield", "Palo Alto", "Newport Beach", "Beverly Hills"
    ],
  },
  {
    code: "CO",
    name: "Colorado",
    cities: [
      "Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood",
      "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial",
      "Boulder", "Greeley", "Longmont", "Loveland", "Grand Junction",
      "Broomfield", "Castle Rock", "Commerce City", "Parker", "Littleton",
      "Northglenn", "Brighton", "Englewood", "Wheat Ridge", "Fountain",
      "Lafayette", "Windsor", "Erie", "Golden", "Steamboat Springs", "Vail", "Aspen"
    ],
  },
  {
    code: "CT",
    name: "Connecticut",
    cities: [
      "Bridgeport", "Stamford", "New Haven", "Hartford", "Waterbury",
      "Norwalk", "Danbury", "New Britain", "West Hartford", "Greenwich",
      "Hamden", "Meriden", "Bristol", "Fairfield", "Manchester",
      "Milford", "Stratford", "East Hartford", "Middletown", "Wallingford",
      "Enfield", "Southington", "Groton", "Norwich", "Torrington", "Shelton"
    ],
  },
  {
    code: "DE",
    name: "Delaware",
    cities: [
      "Wilmington", "Dover", "Newark", "Middletown", "Smyrna",
      "Milford", "Seaford", "Georgetown", "Elsmere", "New Castle",
      "Millsboro", "Laurel", "Harrington", "Camden", "Clayton",
      "Lewes", "Milton", "Selbyville", "Bridgeville", "Rehoboth Beach", "Bethany Beach"
    ],
  },
  {
    code: "DC",
    name: "District of Columbia",
    cities: [
      "Washington", "Georgetown", "Capitol Hill", "Dupont Circle",
      "Adams Morgan", "Navy Yard", "Anacostia", "Foggy Bottom", "Tenleytown"
    ],
  },
  {
    code: "FL",
    name: "Florida",
    cities: [
      "Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg",
      "Hialeah", "Port St. Lucie", "Cape Coral", "Tallahassee", "Fort Lauderdale",
      "Pembroke Pines", "Hollywood", "Gainesville", "Miramar", "Coral Springs",
      "Palm Bay", "West Palm Beach", "Clearwater", "Lakeland", "Pompano Beach",
      "Miami Gardens", "Davie", "Boca Raton", "Sunrise", "Plantation",
      "Deltona", "Palm Coast", "Deerfield Beach", "Fort Myers", "Melbourne",
      "Boynton Beach", "Kissimmee", "Homestead", "Sarasota", "Bradenton", "Naples"
    ],
  },
  {
    code: "GA",
    name: "Georgia",
    cities: [
      "Atlanta", "Augusta", "Columbus", "Macon", "Savannah",
      "Athens", "Sandy Springs", "South Fulton", "Roswell", "Johns Creek",
      "Warner Robins", "Albany", "Alpharetta", "Marietta", "Stonecrest",
      "Smyrna", "Valdosta", "Brookhaven", "Dunwoody", "Peachtree Corners",
      "Gainesville", "Newnan", "Milton", "Rome", "East Point", "Peachtree City"
    ],
  },
  {
    code: "HI",
    name: "Hawaii",
    cities: [
      "Honolulu", "East Honolulu", "Pearl City", "Hilo", "Kailua",
      "Waipahu", "Kaneohe", "Mililani Town", "Kahului", "Ewa Gentry",
      "Kihei", "Kapolei", "Makakilo", "Wahiawa", "Kailua-Kona", "Lahaina", "Kapaa"
    ],
  },
  {
    code: "ID",
    name: "Idaho",
    cities: [
      "Boise", "Meridian", "Nampa", "Idaho Falls", "Caldwell",
      "Pocatello", "Coeur d'Alene", "Twin Falls", "Post Falls", "Lewiston",
      "Rexburg", "Eagle", "Kuna", "Ammon", "Chubbuck", "Hayden", "Mountain Home"
    ],
  },
  {
    code: "IL",
    name: "Illinois",
    cities: [
      "Chicago", "Aurora", "Naperville", "Joliet", "Rockford",
      "Springfield", "Elgin", "Peoria", "Champaign", "Waukegan",
      "Cicero", "Bloomington", "Arlington Heights", "Evanston", "Decatur",
      "Schaumburg", "Bolingbrook", "Palatine", "Skokie", "Des Plaines",
      "Orland Park", "Tinley Park", "Oak Lawn", "Berwyn", "Mount Prospect", "Wheaton"
    ],
  },
  {
    code: "IN",
    name: "Indiana",
    cities: [
      "Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel",
      "Fishers", "Bloomington", "Hammond", "Gary", "Lafayette",
      "Muncie", "Noblesville", "Terre Haute", "Kokomo", "Greenwood",
      "Anderson", "Elkhart", "Mishawaka", "Lawrence", "Jeffersonville", "Columbus"
    ],
  },
  {
    code: "IA",
    name: "Iowa",
    cities: [
      "Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City",
      "Waterloo", "Ames", "West Des Moines", "Council Bluffs", "Ankeny",
      "Dubuque", "Urbandale", "Cedar Falls", "Marion", "Bettendorf", "Mason City"
    ],
  },
  {
    code: "KS",
    name: "Kansas",
    cities: [
      "Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka",
      "Lawrence", "Shawnee", "Manhattan", "Lenexa", "Salina",
      "Hutchinson", "Leavenworth", "Leawood", "Dodge City", "Garden City", "Emporia"
    ],
  },
  {
    code: "KY",
    name: "Kentucky",
    cities: [
      "Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington",
      "Richmond", "Georgetown", "Florence", "Hopkinsville", "Nicholasville",
      "Elizabethtown", "Henderson", "Frankfort", "Jeffersontown", "Independence", "Paducah"
    ],
  },
  {
    code: "LA",
    name: "Louisiana",
    cities: [
      "New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles",
      "Kenner", "Bossier City", "Monroe", "Alexandria", "Houma",
      "New Iberia", "Slidell", "Central", "Ruston", "Sulphur", "Hammond"
    ],
  },
  {
    code: "ME",
    name: "Maine",
    cities: [
      "Portland", "Lewiston", "Bangor", "South Portland", "Auburn",
      "Biddeford", "Sanford", "Saco", "Westbrook", "Augusta",
      "Waterville", "Brunswick", "Orono", "Presque Isle", "Ellsworth", "Bar Harbor"
    ],
  },
  {
    code: "MD",
    name: "Maryland",
    cities: [
      "Baltimore", "Columbia", "Germantown", "Silver Spring", "Waldorf",
      "Frederick", "Ellicott City", "Glen Burnie", "Gaithersburg", "Rockville",
      "Bethesda", "Dundalk", "Bowie", "Towson", "Aspen Hill", "Wheaton", "Annapolis"
    ],
  },
  {
    code: "MA",
    name: "Massachusetts",
    cities: [
      "Boston", "Worcester", "Springfield", "Cambridge", "Lowell",
      "Brockton", "Quincy", "Lynn", "New Bedford", "Fall River",
      "Newton", "Lawrence", "Somerville", "Framingham", "Haverhill",
      "Waltham", "Malden", "Brookline", "Plymouth", "Medford", "Taunton", "Chicopee"
    ],
  },
  {
    code: "MI",
    name: "Michigan",
    cities: [
      "Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor",
      "Lansing", "Flint", "Dearborn", "Livonia", "Troy",
      "Westland", "Farmington Hills", "Kalamazoo", "Wyoming", "Southfield",
      "Rochester Hills", "Pontiac", "Taylor", "St. Clair Shores", "Dearborn Heights", "Royal Oak"
    ],
  },
  {
    code: "MN",
    name: "Minnesota",
    cities: [
      "Minneapolis", "St. Paul", "Rochester", "Bloomington", "Duluth",
      "Brooklyn Park", "Plymouth", "Woodbury", "Lakeville", "Blaine",
      "Maple Grove", "St. Cloud", "Eagan", "Burnsville", "Eden Prairie", "Coon Rapids"
    ],
  },
  {
    code: "MS",
    name: "Mississippi",
    cities: [
      "Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi",
      "Tupelo", "Olive Branch", "Meridian", "Clinton", "Madison",
      "Greenville", "Pearl", "Horn Lake", "Oxford", "Brandon", "Starkville"
    ],
  },
  {
    code: "MO",
    name: "Missouri",
    cities: [
      "Kansas City", "St. Louis", "Springfield", "Columbia", "Independence",
      "Lee's Summit", "O'Fallon", "St. Joseph", "St. Charles", "St. Peters",
      "Blue Springs", "Florissant", "Joplin", "Chesterfield", "Jefferson City", "Cape Girardeau"
    ],
  },
  {
    code: "MT",
    name: "Montana",
    cities: [
      "Billings", "Missoula", "Great Falls", "Bozeman", "Butte",
      "Helena", "Kalispell", "Belgrade", "Havre", "Anaconda", "Miles City", "Whitefish"
    ],
  },
  {
    code: "NE",
    name: "Nebraska",
    cities: [
      "Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney",
      "Fremont", "Hastings", "Norfolk", "North Platte", "Columbus", "Papillion", "La Vista"
    ],
  },
  {
    code: "NV",
    name: "Nevada",
    cities: [
      "Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks",
      "Carson City", "Fernley", "Elko", "Mesquite", "Boulder City", "Fallon", "Pahrump"
    ],
  },
  {
    code: "NH",
    name: "New Hampshire",
    cities: [
      "Manchester", "Nashua", "Concord", "Derry", "Dover",
      "Rochester", "Salem", "Merrimack", "Hudson", "Londonderry", "Keene", "Portsmouth"
    ],
  },
  {
    code: "NJ",
    name: "New Jersey",
    cities: [
      "Newark", "Jersey City", "Paterson", "Elizabeth", "Lakewood",
      "Edison", "Woodbridge", "Toms River", "Hamilton Township", "Trenton",
      "Clifton", "Cherry Hill", "Brick", "Camden", "Passaic", "Bayonne",
      "East Orange", "Union City", "Vineland", "Hoboken", "New Brunswick", "Princeton"
    ],
  },
  {
    code: "NM",
    name: "New Mexico",
    cities: [
      "Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell",
      "Farmington", "Clovis", "Hobbs", "South Valley", "Carlsbad", "Gallup", "Los Alamos"
    ],
  },
  {
    code: "NY",
    name: "New York",
    cities: [
      "New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse",
      "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica",
      "White Plains", "Hempstead", "Troy", "Niagara Falls", "Binghamton",
      "Freeport", "Valley Stream", "Long Beach", "Rome", "Ithaca", "Poughkeepsie"
    ],
  },
  {
    code: "NC",
    name: "North Carolina",
    cities: [
      "Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem",
      "Fayetteville", "Cary", "Wilmington", "High Point", "Concord",
      "Asheville", "Greenville", "Gastonia", "Apex", "Jacksonville",
      "Chapel Hill", "Burlington", "Huntersville", "Rocky Mount", "Mooresville", "Wake Forest"
    ],
  },
  {
    code: "ND",
    name: "North Dakota",
    cities: [
      "Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo",
      "Williston", "Dickinson", "Mandan", "Jamestown", "Wahpeton"
    ],
  },
  {
    code: "OH",
    name: "Ohio",
    cities: [
      "Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron",
      "Dayton", "Parma", "Canton", "Lorain", "Hamilton",
      "Youngstown", "Springfield", "Kettering", "Elyria", "Lakewood",
      "Cuyahoga Falls", "Euclid", "Middletown", "Mansfield", "Newark", "Mentor", "Dublin"
    ],
  },
  {
    code: "OK",
    name: "Oklahoma",
    cities: [
      "Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond",
      "Lawton", "Moore", "Midwest City", "Enid", "Stillwater",
      "Muskogee", "Bartlesville", "Owasso", "Shawnee", "Yukon", "Bixby"
    ],
  },
  {
    code: "OR",
    name: "Oregon",
    cities: [
      "Portland", "Salem", "Eugene", "Gresham", "Hillsboro",
      "Beaverton", "Bend", "Medford", "Springfield", "Corvallis",
      "Albany", "Tigard", "Lake Oswego", "Keizer", "Grants Pass", "Oregon City", "Redmond"
    ],
  },
  {
    code: "PA",
    name: "Pennsylvania",
    cities: [
      "Philadelphia", "Pittsburgh", "Allentown", "Reading", "Erie",
      "Upper Darby", "Scranton", "Bethlehem", "Lower Merion", "Lancaster",
      "Bensalem", "Abington", "Harrisburg", "Penn Hills", "Wilkes-Barre",
      "York", "Chester", "State College", "King of Prussia", "Erie"
    ],
  },
  {
    code: "RI",
    name: "Rhode Island",
    cities: [
      "Providence", "Warwick", "Cranston", "Pawtucket", "East Providence",
      "Woonsocket", "Coventry", "Cumberland", "North Providence", "South Kingstown", "Newport"
    ],
  },
  {
    code: "SC",
    name: "South Carolina",
    cities: [
      "Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill",
      "Greenville", "Summerville", "Goose Creek", "Sumter", "Florence",
      "Spartanburg", "Hilton Head Island", "Myrtle Beach", "Greer", "Aiken", "Anderson"
    ],
  },
  {
    code: "SD",
    name: "South Dakota",
    cities: [
      "Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown",
      "Mitchell", "Yankton", "Pierre", "Huron", "Spearfish", "Vermillion"
    ],
  },
  {
    code: "TN",
    name: "Tennessee",
    cities: [
      "Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville",
      "Murfreesboro", "Franklin", "Johnson City", "Jackson", "Hendersonville",
      "Bartlett", "Kingsport", "Smyrna", "Collierville", "Cleveland", "Brentwood", "Germantown"
    ],
  },
  {
    code: "TX",
    name: "Texas",
    cities: [
      "Dallas", "Houston", "Austin", "San Antonio", "Fort Worth",
      "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock",
      "Irvine", "Laredo", "Garland", "Frisco", "McKinney",
      "Amarillo", "Grand Prairie", "Brownsville", "Killeen", "Denton",
      "Mesquite", "Pasadena", "McAllen", "Waco", "Midland",
      "Carrollton", "Round Rock", "Abilene", "Pearland", "Richardson",
      "College Station", "Beaumont", "Odessa", "League City", "Sugar Land", "Tyler"
    ],
  },
  {
    code: "UT",
    name: "Utah",
    cities: [
      "Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem",
      "Sandy", "St. George", "Ogden", "Layton", "South Jordan",
      "Lehi", "Millcreek", "Taylorsville", "Logan", "Herriman", "Draper", "Park City"
    ],
  },
  {
    code: "VT",
    name: "Vermont",
    cities: [
      "Burlington", "South Burlington", "Rutland", "Barre", "Montpelier",
      "Winooski", "St. Albans", "Newport", "Vergennes", "Brattleboro", "Bennington"
    ],
  },
  {
    code: "VA",
    name: "Virginia",
    cities: [
      "Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News",
      "Alexandria", "Hampton", "Roanoke", "Portsmouth", "Suffolk",
      "Lynchburg", "Centreville", "Dale City", "Reston", "Harrisonburg",
      "McLean", "Leesburg", "Ashburn", "Charlottesville", "Blacksburg", "Manassas", "Fairfax"
    ],
  },
  {
    code: "WA",
    name: "Washington",
    cities: [
      "Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue",
      "Kent", "Everett", "Renton", "Spokane Valley", "Federal Way",
      "Yakima", "Bellingham", "Kirkland", "Kennewick", "Auburn",
      "Pasco", "Marysville", "Lakewood", "Redmond", "Shoreline", "Richland", "Olympia"
    ],
  },
  {
    code: "WV",
    name: "West Virginia",
    cities: [
      "Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling",
      "Weirton", "Fairmont", "Martinsburg", "Beckley", "Clarksburg", "Teays Valley"
    ],
  },
  {
    code: "WI",
    name: "Wisconsin",
    cities: [
      "Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine",
      "Appleton", "Waukesha", "Eau Claire", "Oshkosh", "Janesville",
      "West Allis", "La Crosse", "Sheboygan", "Wauwatosa", "Fond du Lac", "Brookfield"
    ],
  },
  {
    code: "WY",
    name: "Wyoming",
    cities: [
      "Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs",
      "Sheridan", "Green River", "Evanston", "Riverton", "Jackson", "Cody"
    ],
  },
];
