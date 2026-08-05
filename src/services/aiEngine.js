/* ==========================================================================
   CARGOBAY ASSISTANT — GLOBAL LOGISTICS KNOWLEDGE BASE & ENGINE
   Covers: Countries, Ports, Airports, Shipping Routes, Risk Zones, Universal Fares
   ========================================================================== */

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});


/* ── RATES ── */
export const RATES = {
  air: 'CHF 5–15 per kg',
  road: 'CHF 1.2–2.5 per km',
  seaLCL: 'CHF 80–250 per CBM',
  seaFCL: "CHF 1,200–3,500 per 20' FCL",
  rail: 'CHF 700–2,500 per shipment',
  customs: 'CHF 80–300 per declaration',
};

/* ── MAJOR WORLD PORTS ── */
export const PORTS = {
  asia: [
    { name: 'Shanghai', country: 'China', code: 'CNSHA', rank: 1, type: 'Container Mega Port', notes: "World's busiest container port" },
    { name: 'Singapore', country: 'Singapore', code: 'SGSIN', rank: 2, type: 'Transshipment Hub', notes: 'Key Asia-Pacific transshipment hub' },
    { name: 'Ningbo-Zhoushan', country: 'China', code: 'CNNGB', rank: 3, type: 'Container Port' },
    { name: 'Shenzhen (Yantian)', country: 'China', code: 'CNSZN', rank: 4, type: 'Container Port' },
    { name: 'Guangzhou (Nansha)', country: 'China', code: 'CNGZH', rank: 5, type: 'Container Port' },
    { name: 'Qingdao', country: 'China', code: 'CNTAO', rank: 6, type: 'Container Port' },
    { name: 'Busan', country: 'South Korea', code: 'KRPUS', rank: 7, type: 'Transshipment Hub' },
    { name: 'Tianjin (Xingang)', country: 'China', code: 'CNTSN', rank: 8, type: 'Container Port' },
    { name: 'Hong Kong', country: 'China SAR', code: 'HKHKG', rank: 9, type: 'Container & Transshipment' },
    { name: 'Port Klang', country: 'Malaysia', code: 'MYPKG', rank: 10, type: 'Transshipment Hub' },
    { name: 'Tanjung Pelepas', country: 'Malaysia', code: 'MYTPP', rank: 11, type: 'Transshipment Hub' },
    { name: 'Laem Chabang', country: 'Thailand', code: 'THLCH', rank: 12, type: 'Container Port' },
    { name: 'Manila (Batangas)', country: 'Philippines', code: 'PHMNL', rank: 13, type: 'Container Port' },
    { name: 'Jakarta (Tanjung Priok)', country: 'Indonesia', code: 'IDJKT', rank: 14, type: 'Container Port' },
    { name: 'Colombo', country: 'Sri Lanka', code: 'LKCMB', rank: 15, type: 'Transshipment Hub', notes: 'Indian Ocean transshipment' },
    { name: 'Jawaharlal Nehru (JNPT)', country: 'India', code: 'INNSA', rank: 16, type: 'Container Port', notes: "Mumbai, India's largest container port" },
    { name: 'Mundra', country: 'India', code: 'INMUN', rank: 17, type: 'Container Port' },
    { name: 'Chennai (Madras)', country: 'India', code: 'INMAA', rank: 18, type: 'Container Port' },
    { name: 'Karachi (KPT)', country: 'Pakistan', code: 'PKKAR', rank: 19, type: 'Container Port' },
    { name: 'Chittagong', country: 'Bangladesh', code: 'BDCGP', rank: 20, type: 'Container Port' },
    { name: 'Tokyo (Yokohama)', country: 'Japan', code: 'JPYOK', rank: 22, type: 'Container Port' },
    { name: 'Osaka (Kobe)', country: 'Japan', code: 'JPOSA', rank: 23, type: 'Container Port' },
    { name: 'Kaohsiung', country: 'Taiwan', code: 'TWKHH', rank: 24, type: 'Container Port' },
    { name: 'Ho Chi Minh City (Cat Lai)', country: 'Vietnam', code: 'VNSGN', rank: 25, type: 'Container Port' },
    { name: 'Haiphong', country: 'Vietnam', code: 'VNHPH', rank: 26, type: 'Container Port' },
  ],
  middleEast: [
    { name: 'Jebel Ali (Dubai)', country: 'UAE', code: 'AEJEA', rank: 1, type: 'Container & Transshipment Hub', notes: "Middle East's largest port, RISK: proximity to Strait of Hormuz" },
    { name: 'Abu Dhabi (Khalifa)', country: 'UAE', code: 'AEAUH', rank: 2, type: 'Container Port', notes: 'RISK: Hormuz proximity' },
    { name: 'Salalah', country: 'Oman', code: 'OMSLL', rank: 3, type: 'Transshipment Hub', notes: 'Alternative to Hormuz route' },
    { name: 'Dammam (King Abdulaziz)', country: 'Saudi Arabia', code: 'SADMM', rank: 4, type: 'Container Port', notes: 'RISK: Gulf/Hormuz area' },
    { name: 'Jeddah Islamic Port', country: 'Saudi Arabia', code: 'SAJED', rank: 5, type: 'Container Port', notes: 'Red Sea side, RISK: Suez/Red Sea disruption' },
    { name: 'Aqaba', country: 'Jordan', code: 'JOAQJ', rank: 6, type: 'Container Port' },
    { name: 'Bandar Abbas', country: 'Iran', code: 'IRBND', rank: 7, type: 'Container Port', notes: 'RISK: Strait of Hormuz — HIGH RISK ZONE' },
    { name: 'Umm Qasr', country: 'Iraq', code: 'IQUMQ', rank: 8, type: 'Container Port', notes: 'RISK: Gulf conflict zone' },
    { name: 'Kuwait City', country: 'Kuwait', code: 'KWKWI', rank: 9, type: 'Container Port', notes: 'RISK: Gulf/Hormuz area' },
    { name: 'Shuwaikh', country: 'Kuwait', code: 'KWSHK', rank: 10, type: 'General Cargo' },
    { name: 'Doha (Hamad)', country: 'Qatar', code: 'QADHB', rank: 11, type: 'Container Port', notes: 'RISK: Gulf area' },
    { name: 'Muscat (Muttrah)', country: 'Oman', code: 'OMMCT', rank: 12, type: 'General Cargo' },
    { name: 'Sohar', country: 'Oman', code: 'OMSOH', rank: 13, type: 'Industrial Port' },
  ],
  europe: [
    { name: 'Rotterdam', country: 'Netherlands', code: 'NLRTM', rank: 1, type: 'Container Mega Port', notes: "Europe's largest port" },
    { name: 'Antwerp', country: 'Belgium', code: 'BEANR', rank: 2, type: 'Container Port' },
    { name: 'Hamburg', country: 'Germany', code: 'DEHAM', rank: 3, type: 'Container Port', notes: "Germany's main port gateway" },
    { name: 'Bremerhaven', country: 'Germany', code: 'DEBRV', rank: 4, type: 'Container & Auto Port' },
    { name: 'Valencia', country: 'Spain', code: 'ESVLC', rank: 5, type: 'Container Port', notes: 'Mediterranean Spain hub' },
    { name: 'Algeciras', country: 'Spain', code: 'ESALG', rank: 6, type: 'Transshipment Hub', notes: 'Gibraltar Strait gateway' },
    { name: 'Barcelona', country: 'Spain', code: 'ESBCN', rank: 7, type: 'Container Port' },
    { name: 'Genoa', country: 'Italy', code: 'ITGOA', rank: 8, type: 'Container Port', notes: 'North Italy freight gateway' },
    { name: 'Marseille-Fos', country: 'France', code: 'FRMRS', rank: 9, type: 'Container Port', notes: 'South France / Mediterranean' },
    { name: 'Le Havre', country: 'France', code: 'FRLEH', rank: 10, type: 'Container Port', notes: 'North France hub' },
    { name: 'Piraeus', country: 'Greece', code: 'GRPIR', rank: 11, type: 'Container Port', notes: 'Eastern Mediterranean hub' },
    { name: 'Felixstowe', country: 'United Kingdom', code: 'GBFXT', rank: 12, type: 'Container Port', notes: "UK's busiest port" },
    { name: 'Southampton', country: 'United Kingdom', code: 'GBSOU', rank: 13, type: 'Container & RoRo Port' },
    { name: 'Gdansk', country: 'Poland', code: 'PLGDN', rank: 14, type: 'Container Port', notes: 'Baltic Sea gateway' },
    { name: 'Gothenburg', country: 'Sweden', code: 'SEGOT', rank: 15, type: 'Container Port', notes: "Scandinavia's largest port" },
    { name: 'Copenhagen-Malmö', country: 'Denmark/Sweden', code: 'DKCPH', rank: 16, type: 'Container Port' },
    { name: 'Constanta', country: 'Romania', code: 'ROCND', rank: 17, type: 'Container Port', notes: 'Black Sea & Danube gateway' },
    { name: 'Istanbul (Ambarli)', country: 'Turkey', code: 'TRIST', rank: 18, type: 'Container Port', notes: 'Bosphorus Strait gateway' },
    { name: 'Mersin', country: 'Turkey', code: 'TRMER', rank: 19, type: 'Container Port', notes: 'Eastern Mediterranean' },
    { name: 'Trieste', country: 'Italy', code: 'ITTRS', rank: 20, type: 'Container Port', notes: 'Northern Adriatic; key Switzerland/Austria gateway' },
    { name: 'Koper', country: 'Slovenia', code: 'SIKOP', rank: 21, type: 'Container Port', notes: 'Close route to Zurich via rail' },
    { name: 'Riga', country: 'Latvia', code: 'LVRIX', rank: 22, type: 'Container Port', notes: 'Baltic States hub' },
  ],
  africa: [
    { name: 'Port Said', country: 'Egypt', code: 'EGPSD', rank: 1, type: 'Container Port', notes: 'Suez Canal northern entrance — RISK: Red Sea/Suez disruption' },
    { name: 'Alexandria', country: 'Egypt', code: 'EGALY', rank: 2, type: 'Container Port', notes: "Egypt's main commercial port" },
    { name: 'Tanger Med', country: 'Morocco', code: 'MATNG', rank: 3, type: 'Transshipment Hub', notes: 'Strait of Gibraltar, growing hub' },
    { name: 'Durban', country: 'South Africa', code: 'ZADUR', rank: 4, type: 'Container Port', notes: "Africa's busiest container port" },
    { name: 'Cape Town', country: 'South Africa', code: 'ZACPT', rank: 5, type: 'Container Port', notes: 'Cape of Good Hope alternative route' },
    { name: 'Lagos (Apapa)', country: 'Nigeria', code: 'NGLOS', rank: 6, type: 'Container Port', notes: 'West Africa hub' },
    { name: 'Mombasa', country: 'Kenya', code: 'KEMBA', rank: 7, type: 'Container Port', notes: 'East Africa gateway' },
    { name: 'Djibouti', country: 'Djibouti', code: 'DJJIB', rank: 8, type: 'Container Port', notes: 'Horn of Africa hub, Bab el-Mandeb proximity — RISK: Red Sea' },
    { name: 'Dar es Salaam', country: 'Tanzania', code: 'TZDAR', rank: 9, type: 'Container Port' },
    { name: 'Luanda', country: 'Angola', code: 'AOLAD', rank: 10, type: 'Oil & Container Port' },
    { name: 'Abidjan', country: "Côte d'Ivoire", code: 'CIABJ', rank: 11, type: 'Container Port', notes: 'West Africa hub' },
    { name: 'Dakar', country: 'Senegal', code: 'SNDK', rank: 12, type: 'Container Port', notes: 'West Africa gateway' },
  ],
  americas: [
    { name: 'Los Angeles / Long Beach', country: 'USA', code: 'USLAX', rank: 1, type: 'Container Mega Port', notes: 'US West Coast gateway' },
    { name: 'New York / New Jersey', country: 'USA', code: 'USNYC', rank: 2, type: 'Container Port', notes: 'US East Coast hub' },
    { name: 'Savannah', country: 'USA', code: 'USSAV', rank: 3, type: 'Container Port', notes: 'US South-East Coast, fastest growing US port' },
    { name: 'Houston (Barbours Cut)', country: 'USA', code: 'USHOU', rank: 4, type: 'Container & Energy Port', notes: 'US Gulf Coast hub' },
    { name: 'Seattle / Tacoma', country: 'USA', code: 'USSEA', rank: 5, type: 'Container Port', notes: 'US Pacific Northwest' },
    { name: 'Miami', country: 'USA', code: 'USMIA', rank: 6, type: 'Container & Cruise Port', notes: 'US Southeast & LatAm gateway' },
    { name: 'Vancouver', country: 'Canada', code: 'CAVAN', rank: 7, type: 'Container Port', notes: 'Canada Pacific gateway' },
    { name: 'Montreal', country: 'Canada', code: 'CAMTR', rank: 8, type: 'Container Port', notes: 'Canada Atlantic gateway' },
    { name: 'Santos', country: 'Brazil', code: 'BRSSZ', rank: 9, type: 'Container Port', notes: "South America's largest port" },
    { name: 'Cartagena', country: 'Colombia', code: 'COCTG', rank: 10, type: 'Transshipment Hub' },
    { name: 'Callao (Lima)', country: 'Peru', code: 'PECLL', rank: 11, type: 'Container Port', notes: 'West South America hub' },
    { name: 'Buenos Aires', country: 'Argentina', code: 'ARBUE', rank: 12, type: 'Container Port' },
    { name: 'Manzanillo', country: 'Mexico', code: 'MXZLO', rank: 13, type: 'Container Port', notes: 'Mexico Pacific' },
    { name: 'Colon (Panama)', country: 'Panama', code: 'PAONX', rank: 14, type: 'Transshipment Hub', notes: 'RISK: Panama Canal draft restrictions' },
    { name: 'Kingston', country: 'Jamaica', code: 'JMKIN', rank: 15, type: 'Transshipment Hub', notes: 'Caribbean transshipment' },
  ],
  oceania: [
    { name: 'Melbourne', country: 'Australia', code: 'AUMEL', rank: 1, type: 'Container Port', notes: "Australia's busiest container port" },
    { name: 'Sydney (Botany Bay)', country: 'Australia', code: 'AUSYD', rank: 2, type: 'Container Port' },
    { name: 'Brisbane', country: 'Australia', code: 'AUBNE', rank: 3, type: 'Container Port' },
    { name: 'Fremantle (Perth)', country: 'Australia', code: 'AUFRE', rank: 4, type: 'Container Port', notes: 'Australia West Coast' },
    { name: 'Auckland', country: 'New Zealand', code: 'NZAKL', rank: 5, type: 'Container Port', notes: 'New Zealand main gateway' },
    { name: 'Tauranga', country: 'New Zealand', code: 'NZTRG', rank: 6, type: 'Container Port' },
  ],
};

/* ── MAJOR WORLD AIRPORTS ── */
export const AIRPORTS = {
  europe: [
    { name: 'Zurich Airport', code: 'ZRH', country: 'Switzerland', notes: "CargoBay AG Head Office Hub. Europe's 4th largest cargo airport" },
    { name: 'Frankfurt Airport', code: 'FRA', country: 'Germany', notes: "Europe's largest cargo hub" },
    { name: 'Amsterdam Schiphol', code: 'AMS', country: 'Netherlands', notes: 'Major European cargo hub, KLM Cargo base' },
    { name: 'Paris Charles de Gaulle', code: 'CDG', country: 'France', notes: 'Air France Cargo hub' },
    { name: 'London Heathrow', code: 'LHR', country: 'UK', notes: 'Major Europe-global cargo gateway' },
    { name: 'London Stansted', code: 'STN', country: 'UK', notes: 'DHL, FedEx, UPS UK hub' },
    { name: 'Brussels Airport', code: 'BRU', country: 'Belgium', notes: 'Major cargo hub (FedEx, DHL Europe)' },
    { name: 'Madrid Barajas', code: 'MAD', country: 'Spain', notes: 'Iberian Peninsula gateway' },
    { name: 'Barcelona El Prat', code: 'BCN', country: 'Spain' },
    { name: 'Milan Malpensa', code: 'MXP', country: 'Italy', notes: 'Northern Italy; near Zurich corridor' },
    { name: 'Rome Fiumicino', code: 'FCO', country: 'Italy' },
    { name: 'Vienna International', code: 'VIE', country: 'Austria' },
    { name: 'Warsaw Chopin', code: 'WAW', country: 'Poland', notes: 'Central Europe hub' },
    { name: 'Istanbul Airport', code: 'IST', country: 'Turkey', notes: "World's largest airport; Turkey hub" },
    { name: 'Liege Airport', code: 'LGG', country: 'Belgium', notes: 'Major freighter hub in Europe' },
    { name: 'Leipzig/Halle', code: 'LEJ', country: 'Germany', notes: 'DHL Air hub; 3rd busiest EU cargo airport' },
    { name: 'Copenhagen', code: 'CPH', country: 'Denmark', notes: 'Scandinavia hub' },
    { name: 'Helsinki', code: 'HEL', country: 'Finland', notes: 'Nordics & Russia corridor' },
    { name: 'Munich Airport', code: 'MUC', country: 'Germany' },
    { name: 'Geneva Airport', code: 'GVA', country: 'Switzerland', notes: 'Switzerland secondary gateway' },
  ],
  asia: [
    { name: 'Hong Kong International', code: 'HKG', country: 'China SAR', notes: "World's busiest air cargo airport" },
    { name: 'Shanghai Pudong', code: 'PVG', country: 'China', notes: "World's 2nd busiest cargo airport" },
    { name: 'Incheon International', code: 'ICN', country: 'South Korea', notes: "Asia's top transshipment cargo hub" },
    { name: 'Guangzhou Baiyun', code: 'CAN', country: 'China', notes: 'China Southern hub' },
    { name: "Shenzhen Bao'an", code: 'SZX', country: 'China' },
    { name: 'Beijing Capital / Daxing', code: 'PEK', country: 'China', notes: 'CAAC Air Cargo hub' },
    { name: 'Singapore Changi', code: 'SIN', country: 'Singapore', notes: "Southeast Asia's top cargo hub" },
    { name: 'Narita International', code: 'NRT', country: 'Japan', notes: 'Japan main cargo gateway' },
    { name: 'Osaka Kansai', code: 'KIX', country: 'Japan' },
    { name: 'Taipei Taoyuan', code: 'TPE', country: 'Taiwan', notes: 'China Airlines Cargo hub' },
    { name: 'Kuala Lumpur International', code: 'KUL', country: 'Malaysia', notes: 'MAS Cargo hub' },
    { name: 'Bangkok Suvarnabhumi', code: 'BKK', country: 'Thailand', notes: 'Thai Cargo hub' },
    { name: 'Jakarta Soekarno-Hatta', code: 'CGK', country: 'Indonesia' },
    { name: 'Manila Ninoy Aquino', code: 'MNL', country: 'Philippines' },
    { name: 'New Delhi Indira Gandhi', code: 'DEL', country: 'India', notes: "India's largest cargo airport" },
    { name: 'Mumbai Chhatrapati Shivaji', code: 'BOM', country: 'India', notes: 'India main cargo hub' },
    { name: 'Chennai International', code: 'MAA', country: 'India' },
    { name: 'Hyderabad Rajiv Gandhi', code: 'HYD', country: 'India' },
    { name: 'Bengaluru International', code: 'BLR', country: 'India' },
    { name: 'Karachi Jinnah', code: 'KHI', country: 'Pakistan', notes: "Pakistan's main cargo gateway" },
    { name: 'Dhaka Hazrat Shahjalal', code: 'DAC', country: 'Bangladesh' },
    { name: 'Colombo Bandaranaike', code: 'CMB', country: 'Sri Lanka' },
    { name: 'Ho Chi Minh City (Tan Son Nhat)', code: 'SGN', country: 'Vietnam' },
    { name: 'Hanoi Noi Bai', code: 'HAN', country: 'Vietnam' },
  ],
  middleEast: [
    { name: 'Dubai International', code: 'DXB', country: 'UAE', notes: "World's 3rd busiest cargo airport. RISK: Hormuz proximity" },
    { name: 'Dubai Al Maktoum (World Central)', code: 'DWC', country: 'UAE', notes: 'Emirates SkyCargo main hub. RISK: Hormuz area' },
    { name: 'Abu Dhabi International', code: 'AUH', country: 'UAE', notes: 'Etihad Cargo hub' },
    { name: 'Doha Hamad International', code: 'DOH', country: 'Qatar', notes: 'Qatar Airways Cargo hub. RISK: Gulf area' },
    { name: 'Riyadh King Khalid', code: 'RUH', country: 'Saudi Arabia', notes: 'Saudi Arabia main cargo hub' },
    { name: 'Jeddah King Abdulaziz', code: 'JED', country: 'Saudi Arabia', notes: 'Red Sea side, RISK: Red Sea disruption' },
    { name: 'Kuwait International', code: 'KWI', country: 'Kuwait', notes: 'RISK: Gulf area' },
    { name: 'Muscat International', code: 'MCT', country: 'Oman', notes: 'Safe Hormuz bypass alternative' },
    { name: 'Bahrain International', code: 'BAH', country: 'Bahrain', notes: 'RISK: Gulf area' },
    { name: 'Tehran Imam Khomeini', code: 'IKA', country: 'Iran', notes: 'RISK: Sanctioned country, restricted cargo access' },
    { name: 'Beirut Rafic Hariri', code: 'BEY', country: 'Lebanon' },
    { name: 'Amman Queen Alia', code: 'AMM', country: 'Jordan' },
    { name: 'Tel Aviv Ben Gurion', code: 'TLV', country: 'Israel' },
  ],
  americas: [
    { name: 'Memphis International', code: 'MEM', country: 'USA', notes: "World's 2nd busiest cargo airport (FedEx World Hub)" },
    { name: 'Louisville Muhammad Ali', code: 'SDF', country: 'USA', notes: "UPS Worldport hub — world's busiest hub" },
    { name: 'Los Angeles International', code: 'LAX', country: 'USA', notes: 'US West Coast cargo hub' },
    { name: "Chicago O'Hare", code: 'ORD', country: 'USA', notes: 'US Midwest cargo hub' },
    { name: 'New York JFK', code: 'JFK', country: 'USA', notes: 'US East Coast hub' },
    { name: 'Miami International', code: 'MIA', country: 'USA', notes: 'Latin America cargo hub' },
    { name: 'Anchorage Ted Stevens', code: 'ANC', country: 'USA', notes: 'Asia-USA freighter transit stop' },
    { name: 'Dallas/Fort Worth', code: 'DFW', country: 'USA' },
    { name: 'Atlanta Hartsfield-Jackson', code: 'ATL', country: 'USA' },
    { name: 'Toronto Pearson', code: 'YYZ', country: 'Canada', notes: 'Canada main cargo hub' },
    { name: 'Vancouver International', code: 'YVR', country: 'Canada' },
    { name: 'São Paulo Guarulhos', code: 'GRU', country: 'Brazil', notes: "South America's busiest cargo airport" },
    { name: 'Bogotá El Dorado', code: 'BOG', country: 'Colombia', notes: 'LatAm cargo hub' },
    { name: 'Mexico City Benito Juárez', code: 'MEX', country: 'Mexico' },
    { name: 'Buenos Aires Ezeiza', code: 'EZE', country: 'Argentina' },
    { name: 'Lima Jorge Chávez', code: 'LIM', country: 'Peru' },
    { name: 'Santiago Arturo Merino Benítez', code: 'SCL', country: 'Chile' },
  ],
  africa: [
    { name: 'Cairo International', code: 'CAI', country: 'Egypt', notes: 'Africa-Middle East gateway' },
    { name: 'Johannesburg OR Tambo', code: 'JNB', country: 'South Africa', notes: "Africa's largest cargo airport" },
    { name: 'Cape Town International', code: 'CPT', country: 'South Africa' },
    { name: 'Lagos Murtala Muhammed', code: 'LOS', country: 'Nigeria', notes: 'West Africa hub' },
    { name: 'Nairobi Jomo Kenyatta', code: 'NBO', country: 'Kenya', notes: 'East Africa hub' },
    { name: 'Casablanca Mohammed V', code: 'CMN', country: 'Morocco', notes: 'North/West Africa hub' },
    { name: 'Addis Ababa Bole', code: 'ADD', country: 'Ethiopia', notes: 'Ethiopian Airlines cargo hub, biggest African carrier' },
    { name: 'Accra Kotoka', code: 'ACC', country: 'Ghana', notes: 'West Africa gateway' },
    { name: 'Entebbe International', code: 'EBB', country: 'Uganda', notes: 'East Africa hub' },
  ],
  oceania: [
    { name: 'Melbourne Tullamarine', code: 'MEL', country: 'Australia', notes: "Australia's main freight hub" },
    { name: 'Sydney Kingsford Smith', code: 'SYD', country: 'Australia' },
    { name: 'Brisbane International', code: 'BNE', country: 'Australia' },
    { name: 'Perth International', code: 'PER', country: 'Australia', notes: 'Australia West Coast' },
    { name: 'Auckland International', code: 'AKL', country: 'New Zealand' },
  ],
};

/* ── MAJOR SHIPPING ROUTES ── */
export const ROUTES = [
  {
    name: 'Asia–Europe Main Line (AEM)',
    path: 'China/Japan → South China Sea → Malacca Strait → Indian Ocean → Red Sea → Suez Canal → Mediterranean → Rotterdam / Hamburg',
    type: 'Sea',
    transitDays: '25–35 days',
    risk: 'HIGH (Red Sea/Suez disruption active)',
    alternative: 'Cape of Good Hope bypass (+10 days) or Air Freight via ZRH',
  },
  {
    name: 'Transpacific Eastbound (TPE)',
    path: 'Shanghai / Busan / Kaohsiung → Pacific Ocean → Los Angeles / Seattle / Vancouver',
    type: 'Sea',
    transitDays: '13–18 days',
    risk: 'LOW–MODERATE (Panama Canal slot restrictions for East Coast routing)',
  },
  {
    name: 'Transatlantic Trade Lane',
    path: 'Rotterdam / Hamburg / Antwerp → North Atlantic → New York / Savannah / Miami',
    type: 'Sea',
    transitDays: '10–14 days',
    risk: 'LOW',
  },
  {
    name: 'Middle East–Europe Air Corridor',
    path: 'Dubai DXB/DWC → Iran / Gulf states → Europe (ZRH, FRA, AMS)',
    type: 'Air',
    transitDays: '1–3 days',
    risk: 'MODERATE (Hormuz / Iranian airspace restrictions)',
    alternative: 'Reroute via Muscat (MCT) or Doha (DOH) airspace',
  },
  {
    name: 'China–Europe Rail (Silk Road / New Silk Road)',
    path: "Chengdu / Xi'an / Chongqing → Kazakhstan → Russia → Poland → Germany → Zurich",
    type: 'Rail',
    transitDays: '12–18 days',
    risk: 'LOW–MODERATE (Russian transit restrictions since 2022, use Kazakhstan-Turkey corridor)',
    alternative: 'Trans-Caspian route via Azerbaijan → Turkey → Europe',
  },
  {
    name: 'Africa–Europe Trade Corridor',
    path: 'Lagos / Mombasa / Durban → Suez Canal OR Cape of Good Hope → Rotterdam / Genoa / Marseille',
    type: 'Sea',
    transitDays: '18–30 days',
    risk: 'HIGH via Red Sea/Suez; LOW via Cape of Good Hope',
  },
  {
    name: 'Indian Subcontinent–Switzerland (Air)',
    path: 'Mumbai BOM / Delhi DEL → Air corridor → Zurich ZRH',
    type: 'Air',
    transitDays: '1–2 days',
    risk: 'LOW',
  },
  {
    name: 'North America–Europe Air',
    path: 'New York JFK / Chicago ORD → North Atlantic air corridor → Zurich ZRH / Frankfurt FRA',
    type: 'Air',
    transitDays: '1–2 days',
    risk: 'LOW',
  },
  {
    name: 'Southeast Asia–Europe Sea',
    path: 'Singapore SIN / Bangkok BKK / Ho Chi Minh City → Malacca Strait → Indian Ocean → Suez / Cape → Europe',
    type: 'Sea',
    transitDays: '22–32 days',
    risk: 'HIGH (Red Sea/Suez disruption)',
  },
  {
    name: 'South America–Europe (SAMEX)',
    path: 'Santos / Buenos Aires / Callao → South Atlantic → Strait of Gibraltar → Rotterdam / Hamburg',
    type: 'Sea',
    transitDays: '18–28 days',
    risk: 'LOW',
  },
  {
    name: 'Australia/Oceania–Europe',
    path: 'Melbourne / Sydney → Indian Ocean → Suez Canal OR Cape of Good Hope → Rotterdam',
    type: 'Sea',
    transitDays: '30–42 days',
    risk: 'HIGH via Suez; MODERATE via Cape',
  },
  {
    name: 'Intra-Europe Road / Rail (Switzerland Hub)',
    path: 'Any EU city → Zurich Airport Swiss Hub (via CargoBay Rapid Response Trucking, 1-hour pickup available)',
    type: 'Road / Rail',
    transitDays: '1–5 days',
    risk: 'LOW',
  },
];

/* ── RISK ZONES ── */
export const RISK_ZONES = [
  {
    keywords: [
      'hormuz', 'strait of hormuz', 'persian gulf', 'gulf', 'oman',
      'iran', 'bandar abbas', 'iraq', 'umm qasr', 'kuwait', 'bahrain',
      'doha', 'qatar', 'abu dhabi', 'dubai', 'dammam', 'jebel ali', 'khalifa',
      'uae', 'arabian gulf', 'ras al khaimah', 'sharjah', 'fujairah', 'ajman'
    ],
    zone: 'Strait of Hormuz — Persian Gulf Chokepoint',
    severity: 'HIGH RISK 🚨',
    detail: 'Severe geopolitical tensions, military activity, and mine threats in the Strait of Hormuz are causing sudden closures and vessel queuing — expect +5 to +7 days delay on all ocean cargo.',
    advice: 'Switch to <strong>Air Freight</strong> via Zurich Airport (ZRH) or Dubai (DXB) — transit 1–3 days with no sea chokepoint exposure. Alternatively, route sea cargo via <strong>Salalah, Oman</strong> bypass.'
  },
  {
    keywords: [
      'red sea', 'suez', 'suez canal', 'bab el mandeb', 'bab-el-mandeb',
      'aden', 'yemen', 'houthi', 'djibouti', 'port said', 'eritrea', 'somalia',
      'jeddah', 'horn of africa', 'cape of good hope'
    ],
    zone: 'Red Sea / Suez Canal Corridor',
    severity: 'HIGH RISK 🚨',
    detail: 'Houthi missile attacks and maritime security threats are forcing vessels to bypass the Suez Canal, rerouting around Africa\'s Cape of Good Hope — adding 3,500+ nautical miles and +10 to +14 days.',
    advice: 'Consider <strong>CargoBay Air-Sea transshipment</strong> via Dubai (DXB) or use the <strong>Trans-Eurasian Rail corridor</strong> via Kazakhstan and Turkey for overland alternatives.'
  },
  {
    keywords: [
      'panama', 'panama canal', 'gatun lake', 'colon', 'balboa', 'pacific coast usa',
      'transit slot', 'draft limit'
    ],
    zone: 'Panama Canal — Drought & Draft Restrictions',
    severity: 'MODERATE RISK ⚠️',
    detail: 'Reduced Gatun Lake water levels continue to limit daily vessel transit slots and enforce strict draft restrictions, causing +3 to +5 days delay for ocean containers.',
    advice: 'Book FCL slots <strong>at least 3 weeks in advance</strong>. For US East Coast cargo, consider US West Coast + intermodal rail (LA/Long Beach → Chicago → East Coast).'
  },
  {
    keywords: [
      'rotterdam', 'hamburg', 'antwerp', 'bremerhaven', 'north sea',
      'congestion', 'dockers strike', 'port strike', 'vessel queuing'
    ],
    zone: 'North Sea Port Congestion (Rotterdam / Hamburg / Antwerp)',
    severity: 'LOW–MODERATE RISK ⚡',
    detail: 'Seasonal peak volume and occasional industrial action causing container yard dwell time of +1 to +3 days at major North Sea terminals.',
    advice: 'CargoBay\'s <strong>Rapid Response Trucking</strong> (available within 1 hour of notice) can directly collect containers from the port ramp and deliver door-to-door across Europe.'
  },
  {
    keywords: [
      'ukraine', 'russia', 'black sea', 'azov sea', 'odessa', 'sevastopol',
      'novorossiysk', 'mariupol', 'war zone', 'conflict zone', 'belarus'
    ],
    zone: 'Black Sea & Eastern Europe Conflict Zone',
    severity: 'HIGH RISK 🚨',
    detail: 'Ongoing Russia-Ukraine conflict has made the Black Sea routes and Eastern European land corridors extremely high risk. Major port closures and airspace restrictions are in effect.',
    advice: 'Avoid Black Sea routing entirely. Use <strong>Western European overland routes</strong> via Poland, Germany, or Switzerland. CargoBay can coordinate via our EU road network.'
  },
  {
    keywords: [
      'taiwan strait', 'south china sea', 'china taiwan', 'disputed waters',
      'spratlys', 'paracel', 'kaohsiung', 'keelung', 'taiwan'
    ],
    zone: 'Taiwan Strait / South China Sea Tensions',
    severity: 'MODERATE RISK ⚠️',
    detail: 'Ongoing geopolitical tensions in the Taiwan Strait and South China Sea create uncertainty for regional shipping lanes. No active closures, but monitoring is recommended.',
    advice: 'Maintain contingency plans. For urgent cargo, <strong>Air Freight via Hong Kong (HKG) or Singapore (SIN)</strong> provides risk-free alternatives.'
  },
];

/* ── COUNTRIES DATABASE ── */
export const COUNTRIES = {
  'switzerland': { region: 'Europe', capital: 'Bern', mainPort: 'Basel (Rhine)', mainAirport: 'Zurich ZRH', notes: 'CargoBay HQ country. E-Dec customs system.' },
  'germany': { region: 'Europe', capital: 'Berlin', mainPort: 'Hamburg DEHAM', mainAirport: 'Frankfurt FRA', notes: "Europe's largest economy. NCTS transit." },
  'france': { region: 'Europe', capital: 'Paris', mainPort: 'Le Havre FRLEH', mainAirport: 'Paris CDG', notes: 'MRN customs declaration system.' },
  'netherlands': { region: 'Europe', capital: 'Amsterdam', mainPort: 'Rotterdam NLRTM', mainAirport: 'Amsterdam AMS', notes: "Europe's largest port hub." },
  'belgium': { region: 'Europe', capital: 'Brussels', mainPort: 'Antwerp BEANR', mainAirport: 'Brussels BRU / Liege LGG', notes: 'Key logistics hub.' },
  'uk': { region: 'Europe', capital: 'London', mainPort: 'Felixstowe GBFXT', mainAirport: 'London LHR', notes: 'Post-Brexit customs requirements apply.' },
  'italy': { region: 'Europe', capital: 'Rome', mainPort: 'Genoa ITGOA / Trieste ITTRS', mainAirport: 'Milan MXP', notes: 'Key for Switzerland via Trieste/Koper.' },
  'spain': { region: 'Europe', capital: 'Madrid', mainPort: 'Valencia ESVLC / Algeciras ESALG', mainAirport: 'Madrid MAD' },
  'poland': { region: 'Europe', capital: 'Warsaw', mainPort: 'Gdansk PLGDN', mainAirport: 'Warsaw WAW', notes: 'China-Europe rail gateway.' },
  'turkey': { region: 'Europe/Asia', capital: 'Ankara', mainPort: 'Istanbul TRIST / Mersin TRMER', mainAirport: 'Istanbul IST', notes: 'Trans-Caspian corridor hub.' },
  'china': { region: 'Asia', capital: 'Beijing', mainPort: 'Shanghai CNSHA', mainAirport: 'Shanghai PVG / Hong Kong HKG', notes: "World's largest trading nation. China-Europe rail available." },
  'japan': { region: 'Asia', capital: 'Tokyo', mainPort: 'Yokohama JPYOK', mainAirport: 'Tokyo NRT' },
  'south korea': { region: 'Asia', capital: 'Seoul', mainPort: 'Busan KRPUS', mainAirport: 'Incheon ICN', notes: 'Major Asia transshipment hub.' },
  'india': { region: 'Asia', capital: 'New Delhi', mainPort: 'JNPT Mumbai INNSA', mainAirport: 'Delhi DEL / Mumbai BOM', notes: 'Fastest growing freight market.' },
  'singapore': { region: 'Asia', capital: 'Singapore', mainPort: 'Singapore SGSIN', mainAirport: 'Changi SIN', notes: 'Asia top transshipment hub.' },
  'pakistan': { region: 'Asia', capital: 'Islamabad', mainPort: 'Karachi KPT', mainAirport: 'Karachi KHI', notes: 'Gwadar port under development.' },
  'bangladesh': { region: 'Asia', capital: 'Dhaka', mainPort: 'Chittagong BDCGP', mainAirport: 'Dhaka DAC' },
  'vietnam': { region: 'Asia', capital: 'Hanoi', mainPort: 'Ho Chi Minh VNSGN', mainAirport: 'Ho Chi Minh SGN' },
  'thailand': { region: 'Asia', capital: 'Bangkok', mainPort: 'Laem Chabang THLCH', mainAirport: 'Bangkok BKK' },
  'malaysia': { region: 'Asia', capital: 'Kuala Lumpur', mainPort: 'Port Klang MYPKG', mainAirport: 'Kuala Lumpur KUL' },
  'indonesia': { region: 'Asia', capital: 'Jakarta', mainPort: 'Tanjung Priok IDJKT', mainAirport: 'Jakarta CGK' },
  'uae': { region: 'Middle East', capital: 'Abu Dhabi', mainPort: 'Jebel Ali AEJEA', mainAirport: 'Dubai DXB / DWC', notes: 'RISK: Hormuz chokepoint proximity. Global logistics hub.' },
  'saudi arabia': { region: 'Middle East', capital: 'Riyadh', mainPort: 'Jeddah SAJED / Dammam SADMM', mainAirport: 'Riyadh RUH / Jeddah JED', notes: 'RISK: Gulf/Red Sea area.' },
  'qatar': { region: 'Middle East', capital: 'Doha', mainPort: 'Hamad QADHB', mainAirport: 'Doha DOH', notes: 'RISK: Gulf area. Qatar Airways Cargo hub.' },
  'oman': { region: 'Middle East', capital: 'Muscat', mainPort: 'Salalah OMSLL', mainAirport: 'Muscat MCT', notes: 'SAFE Hormuz bypass via Salalah.' },
  'iran': { region: 'Middle East', capital: 'Tehran', mainPort: 'Bandar Abbas IRBND', mainAirport: 'Tehran IKA', notes: 'RISK: VERY HIGH. Restricted cargo access.' },
};

/* ── SYSTEM PROMPT & API INTEGRATION ── */
const SYSTEM_PROMPT = `
You are the official CargoBay logistics assistant, stationed at Zurich Airport (ZRH).
You assist users with freight rates, shipping routes, risk assessments, port/airport codes, and Swiss/EU customs procedures (E-Dec, Carnet ATA, NCTS).
Reference standard rates when asked:
- Air Freight: CHF 5–15 / kg
- Road Freight: CHF 1.2–2.5 / km
- Sea LCL: CHF 80–250 / CBM
- Sea FCL: CHF 1,200–3,500 / 20' container
Provide direct, highly structured, professional responses. Use bold headings and bullet points where helpful.
`;

export async function askCargoBayAI(conversationHistory) {
  try {
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || 'Unable to retrieve a response at this time.';
  } catch (error) {
    console.error('CargoBay AI Engine Error:', error);
    return 'Communication error with the CargoBay backend service. Please verify network status and try again.';
  }
}