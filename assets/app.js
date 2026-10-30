const CONFIG={
  phoneDisplay:"(520) 230-9270",
  phoneTel:"+15202309270",
  formEndpoint:"" // TODO: GHL / Zapier / Make webhook URL. Empty = demo mode
};
const IMG={
"barafter2":"/img/barafter2.webp",
"barbefore":"/img/barbefore.webp",
"bath1":"/img/bath1.webp",
"bath2":"/img/bath2.webp",
"bath3":"/img/bath3.webp",
"bath4":"/img/bath4.webp",
"bath5":"/img/bath5.webp",
"bath6":"/img/bath6.webp",
"bath8":"/img/bath8.webp",
"blockhome":"/img/blockhome.webp",
"bobcat":"/img/bobcat.webp",
"buildframe":"/img/buildframe.webp",
"cabbar":"/img/cabbar.webp",
"coastal":"/img/coastal.webp",
"comframe":"/img/comframe.webp",
"crewgarage":"/img/crewgarage.webp",
"crewladder":"/img/crewladder.webp",
"crewroof":"/img/crewroof.webp",
"deckafter2":"/img/deckafter2.webp",
"deckbefore":"/img/deckbefore.webp",
"deckwork":"/img/deckwork.webp",
"door":"/img/door.webp",
"g1":"/img/g1.webp",
"g2":"/img/g2.webp",
"g3":"/img/g3.webp",
"g4":"/img/g4.webp",
"intframe":"/img/intframe.webp",
"kit1":"/img/kit1.webp",
"kit2":"/img/kit2.webp",
"kit3":"/img/kit3.webp",
"kit4":"/img/kit4.webp",
"kitbefore":"/img/kitbefore.webp",
"logo":"/img/logo.webp",
"pbar":"/img/pbar.webp",
"pbath":"/img/pbath.webp",
"porchdone":"/img/porchdone.webp",
"porchframe":"/img/porchframe.webp",
"shinglebefore":"/img/shinglebefore.webp",
"shopstucco":"/img/shopstucco.webp",
"sign":"/img/sign.webp",
"stuccolath":"/img/stuccolath.webp",
"stuccopatio":"/img/stuccopatio.webp",
"tileafter":"/img/tileafter.webp",
"tilebefore":"/img/tilebefore.webp",
"tower":"/img/tower.webp",
"truck":"/img/truck.webp"
};
const IMGW={"barafter2":484,"barbefore":967,"bath1":1160,"bath2":860,"bath3":574,"bath4":645,"bath5":645,"bath6":645,"bath8":645,"blockhome":860,"bobcat":652,"buildframe":1160,"cabbar":860,"coastal":645,"comframe":860,"crewgarage":645,"crewladder":645,"crewroof":1061,"deckafter2":688,"deckbefore":1160,"deckwork":696,"door":860,"g1":1056,"g2":1024,"g3":1158,"g4":870,"intframe":645,"kit1":860,"kit2":1160,"kit3":573,"kit4":574,"kitbefore":870,"logo":510,"pbar":360,"pbath":360,"porchdone":860,"porchframe":645,"shinglebefore":870,"shopstucco":645,"sign":806,"stuccolath":1061,"stuccopatio":645,"tileafter":759,"tilebefore":860,"tower":878,"truck":870};
const URLS={"custom-homes":"/custom-homes-tucson/","additions-casitas":"/home-additions-casitas-tucson/","framing":"/framing-contractor-tucson/","structural":"/structural-repair-tucson/","stucco":"/stucco-contractor-tucson/","roofing":"/roofing-tucson/","remodeling":"/home-remodeling-tucson/","bathrooms":"/bathroom-remodel-tucson/","decks":"/deck-builder-tucson/","cabinets":"/custom-cabinets-tucson/"};
const PAGE=document.body.dataset.slug||"",HOME=!PAGE;

const ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 12 5 5 9-10"/></svg>';
const CDN="https://d2ol7oe51mr4n9.cloudfront.net/user_3ENLM0AKeKmvf4tDqddMsnHGEvu/";
Object.assign(IMG,{hero:CDN+"2df4f5c0-0c46-41d7-9182-1266693e8c54.jpg",builddone:CDN+"3a50408b-0bd1-4333-8e60-61aa25c20c5b.jpg",stuccodone:CDN+"451a041c-3817-4214-aa5d-5b0c684989a4.jpg",barafter:CDN+"fbbfcc1d-743c-4c41-88d1-fbd82b43387b.jpg",kitafter:CDN+"ded0d984-a33d-4373-b1d9-30b0e8a564a3.jpg",g5:CDN+"8fa67e76-7219-4662-a804-ffad761b2122.jpg",shingleafter:CDN+"8779b1f2-5a2b-464e-8f0b-7a840425a349.jpg",deckafter:CDN+"d9ec3f3e-2462-4ea6-a769-521fee2a5c8d.jpg"});
const HERO_VID=CDN+"c9aa2fdb-f198-43a0-a86f-318cb3604a22.mp4";
const VID={
"bath":"/media/walk-bath.mp4",
"bar":"/media/walk-bar.mp4"
};
/* photo thumbnails for form tiles */
const TP={"custom-homes":"builddone","additions-casitas":"porchdone","framing":"buildframe","structural":"g3","stucco":"stuccodone","roofing":"crewroof","remodeling":"barafter2","bathrooms":"bath4","decks":"deckafter2","cabinets":"kit4","repair":"door","not-sure":"crewladder","sz-small":"tilebefore","sz-partial":"bath3","sz-major":"crewroof","sz-build":"bobcat"};
const tp=k=>`<span class="tp"><img data-k="${TP[k]||k}" alt=""></span>`;

const SERVICES=[
 {slug:"custom-homes",group:"build",name:"Custom Home Construction",short:"Custom Homes",line:"Ground-up homes built for the Sonoran Desert",img:"builddone",hero:"builddone",gal:["builddone","buildframe","tower","blockhome","bobcat","coastal"],ba:"build",cta:"Schedule a Custom Home Consultation",
  h1:"Custom homes, built from the ground up.",sub:"A home designed around how you live, built by a licensed, family-owned Tucson team that handles the framing, structure, stucco and roofing in house.",
  intro:"Building a custom home is the biggest project most families take on. We keep it simple: one licensed general contractor, one point of contact, and a crew that does the individual trades every week on repairs and remodels.",
  tiers:[["Early ideas","Thinking about building","Have a lot or looking for one? We'll talk through what you want, what it involves and the next steps."],["Plans in hand","Ready for a builder","Already have drawings? We'll review them, walk the site and talk through scope and schedule."],["Full build","Ground-up construction","Foundation to final walkthrough: framing, structure, stucco, roofing, interiors and finishes."]],
  incl:["Site walk and scope consultation","Framing and structural work by our own crew","Stucco, roofing and exterior finishes","Interior finishes, bathrooms and cabinetry","Clear communication from start to finish"]},
 {slug:"additions-casitas",group:"build",name:"Home Additions & Casitas",short:"Additions & Casitas",line:"Room additions, primary suites, detached casitas",img:"porchdone",hero:"porchdone",gal:["porchdone","porchframe","intframe","g3"],ba:"porch",cta:"Plan an Addition or Casita",
  h1:"Additions & casitas that feel like they were always there.",sub:"More space for family, guests or rental income, matched to your existing home's stucco, roofline and style.",
  intro:"A casita or addition is the fastest way to get more out of the property you already own. We handle the full build, from framing and structure to stucco, roofing and interior finishes, so the new space blends with the old.",
  tiers:[["Smaller","Bump-outs & extensions","Extend a kitchen, living room or bedroom without a full second structure."],["Mid-size","Primary suite or room addition","A new bedroom, bathroom or living area attached to your home."],["Complete","Detached casita","A self-contained guest house with its own entry, bath and living space."]],
  incl:["Site walk and layout consultation","Framing and structural tie-in to your existing home","Stucco and roofing matched to the main house","Bathrooms, kitchenettes and cabinetry","One team from start to finish"]},
 {slug:"framing",group:"repair",name:"Framing & Framing Repairs",short:"Framing",line:"From one rotted stud to full structural framing",img:"intframe",hero:"buildframe",gal:["intframe","comframe","porchframe","g2"],ba:"build",cta:"Request a Framing Estimate",
  h1:"Framing done right, from repairs to full builds.",sub:"Damaged studs, sagging headers, reframing for a remodel, or complete framing for an addition or new home.",
  intro:"Framing is the skeleton of every home. Our crew frames new homes and additions and repairs framing on existing homes, so we know what good framing looks like and how to fix it when it isn't.",
  tiers:[["Repair","Framing repairs","Rotted or damaged studs, sagging headers, termite or water damage."],["Partial","Reframing for remodels","Moving walls, new openings, framing for showers, closets and built-ins."],["Complete","New framing","Full framing for additions, casitas and custom homes."]],
  incl:["Inspection of existing framing","Repair or replacement of damaged members","Reframing for remodels and new openings","Full framing packages for new construction"]},
 {slug:"structural",group:"repair",name:"Structural Repairs",short:"Structural Repairs",line:"Beams, posts, headers and load-bearing fixes",img:"g1",hero:"g2",gal:["g1","g2","g3","crewgarage"],ba:"garage",cta:"Request a Structural Repair Estimate",
  h1:"Structural repairs you can trust.",sub:"Rotted beams, failing posts, sagging headers and load-bearing changes handled by a licensed general contractor.",
  intro:"Structural problems don't fix themselves. We open it up, show you what's going on in plain language and repair it properly, whether that's a single post or a full beam replacement over a garage.",
  tiers:[["Repair","Isolated structural fixes","Cracked or failing beams, posts, joists and supports."],["Partial","Reinforcement & wall changes","Load-bearing wall changes, new headers and reinforcement."],["Complete","Major rebuilds","Larger structural rebuilds after water damage, age or poor past work."]],
  incl:["On-site assessment","Clear explanation of the problem and options","Beam, post, joist and header repairs","Load-bearing wall modifications"]},
 {slug:"stucco",group:"repair",name:"Stucco Installation & Repairs",short:"Stucco",line:"Crack repair, re-coats and new stucco",img:"stuccodone",hero:"stuccodone",gal:["stuccolath","stuccodone","stuccopatio","g4","g5","shopstucco"],ba:"stucco",cta:"Request a Stucco Estimate",
  h1:"Stucco installation & repair.",sub:"Crack and patch repairs blended into your finish, wall sections re-coated, and full new stucco for additions, casitas and homes.",
  intro:"Stucco is the face of most Tucson homes, and the desert is hard on it. We repair cracks and damaged areas so they blend in, and install full new stucco systems, from lath and wire to the finish coat.",
  tiers:[["Repair","Cracks & patches","Crack repair, damaged sections and patches blended into your existing finish."],["Partial","Re-coats & sections","Re-coating walls, larger damaged areas and refinishing."],["Complete","New stucco","Full stucco systems for new homes, additions and re-sides."]],
  incl:["Crack and patch repairs","Texture matching to existing finish","Lath, wire and full stucco systems","Residential and commercial stucco"]},
 {slug:"roofing",group:"repair",name:"Roofing & Roof Repairs",short:"Roofing",line:"Leaks, tile repairs, underlayment and full roofs",img:"crewroof",hero:"crewroof",gal:["crewroof","crewladder","shinglebefore","shingleafter","tilebefore","tileafter"],ba:"shingle",cta:"Request a Roofing Estimate",
  h1:"Roofing & roof repairs.",sub:"Leaks, slipped or broken tiles and flashing repairs, through to underlayment replacement and complete new roofs.",
  intro:"Between the sun and monsoon season, Tucson roofs take a beating. We repair leaks and damaged tiles, replace worn underlayment and install complete new tile and shingle roofs.",
  tiers:[["Repair","Leaks & tile repairs","Leaks, slipped or broken tiles, flashing and vent repairs."],["Partial","Section replacement","Replacing decking, underlayment and tiles on damaged sections."],["Complete","New roof","Full tile re-roofs, shingle roofs and new roofs for new construction."]],
  incl:["Roof inspection","Leak and tile repairs","Decking and underlayment replacement","Tile and shingle re-roofs"]},
 {slug:"remodeling",group:"repair",name:"Home Remodeling",short:"Home Remodeling",line:"Single rooms to whole-home renovations",img:"kit2",hero:"kit2",gal:["kitbefore","kitafter","barbefore","barafter2","kit1","kit3"],ba:"bar",cta:"Request a Remodeling Estimate",
  h1:"Home remodeling, any size.",sub:"Refresh one room, renovate several or take a whole home back to the studs. One licensed team handles every trade.",
  intro:"Because we handle framing, structural work, finishes and cabinetry, remodels move faster with fewer hand-offs. Tell us what you want to change and we'll show you how to get there.",
  tiers:[["Smaller","Single-room refresh","One room updated: finishes, fixtures, flooring and trim."],["Partial","Multi-room renovation","Kitchens, wet bars, bathrooms and living spaces reworked together."],["Complete","Whole-home remodel","A full renovation, including layout changes and new framing."]],
  incl:["Walk-through and scope consultation","Demolition and reframing (arches to square openings and more)","Countertops, backsplashes and finishes","Cabinets, trim and carpentry"]},
 {slug:"bathrooms",group:"repair",name:"Bathroom Remodeling & Custom Showers",short:"Bathrooms & Showers",line:"Fixture fixes to full custom showers",img:"bath1",hero:"bath1",gal:["bath1","bath4","bath2","bath3","bath5","bath6","bath8"],ba:null,cta:"Request a Bathroom Estimate",
  h1:"Bathrooms & custom showers.",sub:"From a vanity swap or tile repair to a full custom walk-in shower and complete bathroom remodel.",
  intro:"A good bathroom is all in the details: waterproofing, tile layout, niches, glass and fixtures. We build custom showers and full bathrooms, and handle the smaller fixes too.",
  tiers:[["Repair","Fixes & updates","Vanity swaps, tile repairs, fixtures and small updates."],["Partial","Custom shower","Tub-to-shower conversions and walk-in showers with niches, benches and glass."],["Complete","Full remodel","A complete bathroom: layout, shower, vanity, tile, lighting and finishes."]],
  incl:["Custom tile showers with niches and benches","Glass enclosures and fixtures","Vanities and cabinetry","Full bathroom remodels"]},
 {slug:"decks",group:"repair",name:"Deck Construction & Replacement",short:"Decks",line:"Board repairs to brand-new decks",img:"deckafter",hero:"deckafter",gal:["deckbefore","deckafter","deckafter2","deckwork"],ba:"deck",cta:"Request a Deck Estimate",
  h1:"Decks built for Arizona living.",sub:"Board, rail and stair repairs, resurfacing and partial rebuilds, or a complete new deck or full replacement.",
  intro:"The Tucson sun is hard on decks. We repair what can be saved and replace what can't, building decks with solid framing, clean railings and boards that look good for years.",
  tiers:[["Repair","Deck repairs","Loose or damaged boards, railings and stairs."],["Partial","Resurface & rebuild","New decking on sound framing, or partial rebuilds."],["Complete","New deck","A brand-new deck or full tear-out and replacement."]],
  incl:["Deck inspections","Board, railing and stair repairs","Resurfacing and partial rebuilds","New decks and full replacements"]},
 {slug:"cabinets",group:"repair",name:"Cabinet Installation & Carpentry",short:"Cabinets & Carpentry",line:"Door fixes, vanities, kitchens and built-ins",img:"kit4",hero:"barafter2",gal:["kit4","cabbar","barafter","kit2"],ba:"kitchen",cta:"Request a Cabinet Estimate",
  h1:"Cabinets & finish carpentry.",sub:"Door and hinge repairs, new vanities and cabinet installs, and full kitchen cabinetry and built-ins.",
  intro:"Clean cabinet installation and carpentry is what makes a remodel look finished. We install vanities, kitchen cabinets, wet bars and built-ins, and take care of the small carpentry fixes too.",
  tiers:[["Repair","Carpentry fixes","Doors, hinges, drawers, trim and small carpentry repairs."],["Partial","Cabinet installs","New vanities, cabinet runs and replacements."],["Complete","Full cabinetry","Kitchen cabinetry, wet bars, built-ins and finish carpentry throughout."]],
  incl:["Cabinet and vanity installation","Wet bars and floating shelves","Trim and finish carpentry","Small carpentry repairs"]}
];
const SVC=Object.fromEntries(SERVICES.map(s=>[s.slug,s]));
const FORM_SERVICES=[...SERVICES.map(s=>({id:s.slug,label:s.short})),{id:"repair",label:"Other repair"},{id:"not-sure",label:"Not sure yet"}];

const BA={
 stucco:{tab:"Stucco re-side",b:"stuccolath",a:"stuccodone",v:"b6fb3673-8a72-406d-a22f-23df29bf6450",tag:"Stucco installation",title:"Lath and wire to finished stucco.",desc:"A manufactured home wrapped in lath and wire, then finished in a full stucco system and new trim color.",svc:"stucco"},
 bar:{tab:"Wet bar remodel",b:"barbefore",a:"barafter",v:"2eec570b-d5c4-4577-a359-bcf9748e9f8e",tag:"Remodel & cabinets",title:"Dated arch to a lit marble bar.",desc:"The arched niche was squared off and rebuilt with a marble backsplash, lit floating shelves, new cabinetry and wine storage.",svc:"remodeling"},
 build:{tab:"Custom home",b:"buildframe",a:"builddone",v:"dad16810-2d9c-49f6-9910-8b4156c82953",tag:"Custom home construction",title:"Framed to finished.",desc:"The same custom home at the framing stage and after stucco, windows and a standing-seam roof.",svc:"custom-homes"},
 kitchen:{tab:"Kitchen opening",b:"kitbefore",a:"kitafter",v:"0f7da5ff-dc33-49eb-b217-eb17832c166a",tag:"Remodel & carpentry",title:"Round arch to a clean, open bar.",desc:"A rounded pass-through opened up and squared off, with a new marble-look counter on a dark wood base.",svc:"remodeling"},
 deck:{tab:"Deck rebuild",b:"deckbefore",a:"deckafter",v:"47c00220-ad19-464a-a8f5-849e3953f424",tag:"Deck replacement",title:"Weathered to rebuilt.",desc:"A worn, peeling hillside deck replaced with new boards, railings and a covered section.",svc:"decks"},
 shingle:{tab:"Re-roof",b:"shinglebefore",a:"shingleafter",v:"93fc8bff-bbbe-44b9-876f-3642d9665f0f",tag:"Roofing",title:"Rotted decking to a brand-new roof.",desc:"Failed shingles and rotted decking torn off and replaced with new decking, underlayment and architectural shingles.",svc:"roofing"},
 garage:{tab:"Structural repair",b:"g1",a:"g5",v:"40d5afb4-46b9-4c4f-933b-4d4510def785",tag:"Structural repair",title:"Rotted beam to solid wall.",desc:"A rotted beam over a two-car garage cut out, reframed, sheathed, lathed and stuccoed.",svc:"structural"},
 tile:{tab:"Tile roof repair",b:"tilebefore",a:"tileafter",tag:"Roof repair",title:"Broken section to sealed tile roof.",desc:"A damaged section of tile roof opened up, re-decked and re-tiled to match.",svc:"roofing"},
 porch:{tab:"New build",b:"porchframe",a:"porchdone",tag:"New construction",title:"Sheathing to stucco.",desc:"A single-story build with a deep covered patio, from sheathed framing to finished stucco and metal roof.",svc:"additions-casitas"}
};
const BA_ORDER=["build","bar","stucco","kitchen","deck","shingle","garage"];

const STORY=[["g1","Rotted beam exposed","Water damage found behind the stucco above the garage."],["g2","Reframed","Rotted wood cut out and new framing installed."],["g3","Sheathed","New sheathing ties the structure together."],["g4","Lath & wire","Weather barrier and lath go on, ready for stucco."],["g5","Stucco applied","Brown coat on, ready for the finish color."]];

const GALLERY=[["builddone","Homes","Finished custom home"],["kit2","Kitchens","Walnut kitchen with waterfall island"],["bath1","Bathrooms","Freestanding tub & feature wall"],["crewroof","Roofing","Tile re-roof underway"],["stuccodone","Stucco","Full stucco re-side"],["barafter2","Kitchens","Lit marble wet bar"],["tower","Homes","Custom home entry tower"],["bath4","Bathrooms","Double vanity & walk-in shower"],["deckafter","Decks","New deck & covered section"],["@bar","Kitchens","Wet bar walkthrough"],["kit1","Kitchens","Island & feature hood"],["shingleafter","Roofing","New shingle roof"],["bath3","Bathrooms","Walk-in shower with bench"],["coastal","Homes","Three-story modern build"],["kit3","Kitchens","Waterfall island & beams"],["g3","Structural","Garage beam rebuilt & sheathed"],["bath2","Bathrooms","Primary bath"],["shopstucco","Stucco","Commercial stucco"],["deckafter2","Decks","Redwood-tone deck"],["blockhome","Homes","Block home & tile roof"],["bath5","Bathrooms","Marble-look shower & black fixtures"],["kit4","Kitchens","Fluted island & walnut cabinets"],["tileafter","Roofing","Tile roof repair"],["intframe","Framing","Interior framing"],["bath6","Bathrooms","Tub & rain shower"],["cabbar","Kitchens","Black cabinet bar"],["comframe","Framing","Commercial framing"],["bath8","Bathrooms","Green tile & walnut vanity"],["door","Repairs","Door replacement"],["deckwork","Decks","Deck rebuild"],["bobcat","Homes","Custom home under construction"]];

const FAQ=[["Do you take on small repair jobs?","Yes. Repairs and smaller improvements are a big part of what we do. Whether it's a roof leak, a stucco crack, a few rotted deck boards or a cabinet that won't close, send us the details and we'll help."],["Can you build a casita or addition on my property?","That's one of our main areas. Tell us about your property and what you want the space for, and we'll walk the site with you and talk through what's involved and the next steps."],["Are you licensed?","Yes. AZ Atlas Builder Group is a licensed general contractor with the Arizona Registrar of Contractors, license #344537. You can verify it on the ROC website."],["What areas do you serve?","We're based in Tucson and work throughout Tucson and the surrounding areas. If you're not sure we cover your location, just ask in the form."],["What should I include in my request?","A short description, your location and a few photos if you have them. Photos are especially helpful for repairs, so we can understand the job before we visit."]];

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const imgIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){load(e.target);imgIO.unobserve(e.target)}}),{rootMargin:"600px 0px"});
function load(i){const k=i.dataset.k;if(!IMG[k]||i.dataset.set===k)return;i.dataset.set=k;i.decoding="async";i.removeAttribute("srcset");i.onload=()=>i.classList.add("ld");const w=i.getBoundingClientRect().width*Math.min(devicePixelRatio||1,3),tier=!IMGW[k]||i.hasAttribute("data-full")?"":w<=260?"-xs":w<=700?"-sm":"";i.src=tier?IMG[k].replace(".webp",tier+".webp"):IMG[k];if(i.complete)i.classList.add("ld")}
function setImgs(root=document){$$("img[data-k]",root).forEach(i=>{if(i.closest("#mega,#mlinks"))return;if(i.hasAttribute("data-eager"))load(i);else imgIO.observe(i)})}
function setContacts(root=document){$$("[data-phone]",root).forEach(e=>e.textContent=CONFIG.phoneDisplay);$$("[data-tel]",root).forEach(a=>a.href="tel:"+CONFIG.phoneTel)}
const im=(k,alt="")=>`<img data-k="${k}" alt="${alt}">`;

/* ---------- video helpers ---------- */
const vBlob={};
function vsrc(k){return VID[k]}
function prepV(v){v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute("muted","");v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","")}
function tryPlay(v,fail){prepV(v);try{const p=v.play();if(p&&p.catch)p.catch(()=>fail&&fail())}catch(e){fail&&fail()}}
const vIO=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.getAttribute("src")&&v.dataset.v)v.src=vsrc(v.dataset.v);tryPlay(v)}else if(!v.paused)v.pause()}),{threshold:.2});

/* ---------- static builds ---------- */
$("#yr").textContent=new Date().getFullYear();
(()=>{
 $("#mega").innerHTML=SERVICES.map(s=>`<a href="${URLS[s.slug]}"><span class="mi">${im(s.img)}</span><span><b>${s.short}</b><span>${s.line}</span></span></a>`).join("")+`<div class="mega-foot"><div><b style="color:#fff">Small repair or full build?</b><span>Same team. Same form.</span></div><a class="btn btn-red btn-sm" href="#estimate" data-scroll="estimate">Get an estimate</a></div>`;
 $("#mlinks").innerHTML=SERVICES.map(s=>`<a href="${URLS[s.slug]}">${im(s.img)}${s.short}</a>`).join("");
 $("#fBuild").innerHTML=SERVICES.filter(s=>s.group==="build").map(s=>`<a href="${URLS[s.slug]}">${s.short}</a>`).join("");
 $("#fRepair").innerHTML=SERVICES.filter(s=>s.group==="repair").map(s=>`<a href="${URLS[s.slug]}">${s.short}</a>`).join("");

})();
HOME&&(()=>{
 const vtile=(k,cap)=>`<video data-v="${k}" poster="${IMG["p"+k]}" muted loop playsinline preload="none"></video>`;
 const PREV=[["@bath","Bathroom walkthrough"],["builddone","Finished custom home"],["kit2","Walnut kitchen"],["bath1","Freestanding tub & feature wall"],["crewroof","Our crew on a tile re-roof"]];
 $("#gprev").innerHTML=PREV.map(p=>p[0][0]==="@"?`<div class="g" data-lb="${p[0]}" data-cap="${p[1]}">${vtile(p[0].slice(1))}<span class="live">Real walkthrough</span><span class="cap">${p[1]}</span></div>`:`<div class="g" data-lb="${p[0]}" data-cap="${p[1]}">${im(p[0],p[1])}<span class="cap">${p[1]}</span></div>`).join("");
 const ALL=[["@bath","Bathrooms","Bathroom walkthrough"],...GALLERY];
 $("#gcount").textContent="· "+ALL.length+" photos & videos";
 const cats=["All",...new Set(ALL.map(g=>g[1]))];
 $("#filters").innerHTML=cats.map((c,i)=>`<button class="${i?"":"on"}" data-f="${c}">${c}</button>`).join("");
 $("#gal").innerHTML=ALL.map(g=>`<figure class="gi" data-c="${g[1]}" data-lb="${g[0]}" data-cap="${g[2]}" data-tilt>${g[0][0]==="@"?`<video data-v="${g[0].slice(1)}" poster="${IMG["p"+g[0].slice(1)]}" muted loop playsinline preload="none"></video>`:im(g[0],g[2])}<figcaption>${g[2]}<em>${g[1]}</em></figcaption></figure>`).join("");
 $("#filters").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$$("#filters button").forEach(x=>x.classList.toggle("on",x===b));$$(".gi").forEach(g=>g.classList.toggle("hide",b.dataset.f!=="All"&&g.dataset.c!==b.dataset.f))});
 $$("video[data-v]").forEach(v=>{prepV(v);vIO.observe(v)});
 const gov=$("#gov");
 const open=()=>{gov.classList.add("on");gov.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";gov.scrollTop=0;setImgs(gov)};
 window.closeGallery=()=>{gov.classList.remove("on");gov.setAttribute("aria-hidden","true");if(!$("#lb").classList.contains("on"))document.body.style.overflow="";$$("video",gov).forEach(v=>v.pause())};
 $("#gopenBtn").addEventListener("click",open);$("#gclose").addEventListener("click",closeGallery);
})();
HOME&&(()=>{const star='<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>';
 $("#revGrid").innerHTML=[0,1,2].map(i=>`<div class="rcardv rv d${i+1}"><span class="slot-tag">Review slot</span><div class="stars">${star.repeat(5)}</div><p>Paste a real Google review here, word for word from the AZ Atlas Google Business Profile.</p><div class="who"><span class="av">${"ABC"[i]}</span><div><b>Homeowner name</b><span>Project type &middot; Tucson, AZ</span></div></div></div>`).join("")})();
HOME&&(()=>{$("#faqList").innerHTML=FAQ.map((q,i)=>`<div class="qa${i?"":" open"}"><button type="button">${q[0]}<span class="pm"></span></button><div class="ans"><div><p>${q[1]}</p></div></div></div>`).join("");
 $("#faqList").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const qa=b.parentElement,o=!qa.classList.contains("open");$$("#faqList .qa").forEach(x=>x.classList.remove("open"));if(o)qa.classList.add("open")})})();

/* ---------- before / after ---------- */
function makeBA(stage,tabsEl,order,opts={}){
 let cur=order[0],pos=50,auto=true;
 const bImg=$(".before",stage),aImg=$(".after",stage);
 const set=p=>{pos=Math.max(0,Math.min(100,p));stage.style.setProperty("--p",pos+"%")};
 const show=(key,first)=>{const d=BA[key];cur=key;
  const swap=()=>{bImg.dataset.k=d.b;aImg.dataset.k=d.a;delete bImg.dataset.set;delete aImg.dataset.set;load(bImg);load(aImg);bImg.alt="Before: "+d.title;aImg.alt="After: "+d.title;
};
  if(first){swap();return}
  swap();peek()};
 const peek=()=>{auto=true;let t0=null;const run=ts=>{if(!auto)return;t0=t0||ts;const k=(ts-t0)/1600;if(k>=1){set(50);return}set(50+Math.sin(k*Math.PI*2)*28);requestAnimationFrame(run)};requestAnimationFrame(run)};
 if(false){tabsEl.innerHTML=order.map((k,i)=>`<button class="ba-tab${i?"":" on"}" data-k="${k}">${im(BA[k].a)}${BA[k].tab}</button>`).join("");
  tabsEl.addEventListener("click",e=>{const b=e.target.closest(".ba-tab");if(!b||b.dataset.k===cur)return;$$(".ba-tab",tabsEl).forEach(x=>x.classList.toggle("on",x===b));b.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});show(b.dataset.k)})}
 let drag=false,sx=0,sy=0,decided=false;
 const fromEv=e=>{const r=stage.getBoundingClientRect();return (e.clientX-r.left)/r.width*100};
 stage.addEventListener("pointerdown",e=>{drag=true;decided=e.pointerType!=="touch";sx=e.clientX;sy=e.clientY;auto=false;if(decided){stage.setPointerCapture(e.pointerId);set(fromEv(e))}});
 stage.addEventListener("pointermove",e=>{if(!drag)return;if(!decided){const dx=Math.abs(e.clientX-sx),dy=Math.abs(e.clientY-sy);if(dx<6&&dy<6)return;if(dy>dx){drag=false;return}decided=true;try{stage.setPointerCapture(e.pointerId)}catch(_){}}set(fromEv(e))});
 ["pointerup","pointercancel"].forEach(t=>stage.addEventListener(t,()=>{drag=false}));
 stage.addEventListener("touchmove",e=>{if(drag&&decided)e.preventDefault()},{passive:false});
 show(cur,true);set(50);
 new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){peek();o.disconnect()}}),{threshold:.5}).observe(stage);
 return {show};
}

/* featured before/after player */
const vidUrl=k=>CDN+BA[k].v+".mp4";
function makePlayer(screen,key,list,modes){
 const v=$("video",screen),cmp=makeBA($(".ba-stage",screen),null,[key]);let cur=key,mode="vid";
 const prog=$(".ba-prog i",screen);
 v.addEventListener("timeupdate",()=>{if(v.duration)prog.style.setProperty("--vp",(v.currentTime/v.duration).toFixed(3))});
 prepV(v);const tap=()=>screen.classList.add("needtap");v.addEventListener("playing",()=>screen.classList.remove("needtap"));
 const pb=$(".ba-play",screen);if(pb)pb.addEventListener("click",()=>{screen.classList.remove("needtap");tryPlay(v,tap)});
 const setV=k=>{v.poster=IMG[BA[k].b]||"";v.src=vidUrl(k);v.load();tryPlay(v,tap)};
 const info=k=>{const d=BA[k];if(!$("#baTitle")||!list)return;$("#baTitle").textContent=d.title;const c=$("#baCta");c.dataset.preset=d.svc;c.textContent="Get a "+SVC[d.svc].short.toLowerCase()+" estimate"};
 const show=(k,first)=>{if(k===cur&&!first)return;cur=k;
  const go=()=>{if(mode==="vid"||!BA[k].v)setV(k);cmp.show(k,true);info(k)};
  if(first){go();return}
  screen.classList.add("flip");setTimeout(()=>{go();screen.classList.remove("flip");screen.classList.add("flip-in");void screen.offsetWidth;screen.classList.remove("flip-in")},300)};
 const setMode=m=>{mode=m;screen.classList.toggle("cmp",m==="cmp");if(modes){$$("button",modes).forEach(b=>b.classList.toggle("on",b.dataset.m===m));moveKnob()}if(m==="vid"){if(v.getAttribute("src")!==vidUrl(cur))setV(cur);else tryPlay(v,tap)}else v.pause()};
 const moveKnob=()=>{const b=$("button.on",modes),k=$(".knob",modes);k.style.width=b.offsetWidth+"px";k.style.transform=`translateX(${b.offsetLeft-4}px)`};
 if(modes){modes.addEventListener("click",e=>{const b=e.target.closest("button");if(b)setMode(b.dataset.m)});addEventListener("resize",moveKnob);requestAnimationFrame(moveKnob)}
 if(list){list.innerHTML=BA_ORDER.map((k,i)=>`<button class="ba-item${i?"":" on"}" data-k="${k}"><span class="th">${im(BA[k].a)}</span><span><b>${BA[k].tab}</b></span></button>`).join("");
  list.addEventListener("click",e=>{const b=e.target.closest(".ba-item");if(!b)return;$$(".ba-item",list).forEach(x=>x.classList.toggle("on",x===b));if(matchMedia("(max-width:1080px)").matches)b.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});show(b.dataset.k)})}
 /* only load video when near viewport */
 let started=false;new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){if(!started){started=true;show(cur,true)}else if(mode==="vid")tryPlay(v,tap)}else v.pause()}),{rootMargin:"0px 0px",threshold:.15}).observe(screen);
 cmp.show(key,true);info(key);
 return {show,setMode};
}
HOME&&makePlayer($("#baScreen"),BA_ORDER[0],$("#baList"),$("#baModes"));



/* ---------- ring ---------- */
const RING=HOME&&(()=>{const view=$("#ringView"),ring=$("#ring");
 ring.innerHTML=SERVICES.map(s=>`<a class="rcard" href="${URLS[s.slug]}" draggable="false">${im(s.img,s.name)}<div class="rl"><small>${s.group==="build"?"Build":"Repair & improve"}</small><b>${s.short}</b><span>View service ${ARROW.replace('<svg','<svg width="14" height="14"')}</span></div></a>`).join("");
 const cards=$$(".rcard",ring),N=cards.length;let rot=0,vel=-0.08,drag=false,lx=0,moved=0,R=400,cw=240,visible=false;
 const layout=()=>{const w=view.clientWidth;cw=w<520?180:w<900?230:290;ring.style.setProperty("--cw",cw+"px");cards.forEach(c=>c.style.setProperty("--cw",cw+"px"));R=Math.round((cw+26)/(2*Math.tan(Math.PI/N)));cards.forEach((c,i)=>c.style.transform=`rotateY(${i*360/N}deg) translateZ(${R}px)`)};
 const frame=()=>{if(visible){if(!drag){rot+=vel;vel+=((-0.08)-vel)*0.02}
   ring.style.transform=`translateZ(${-R}px) rotateX(-6deg) rotateY(${rot}deg)`;
   cards.forEach((c,i)=>{const a=((i*360/N+rot)%360+360)%360;const f=Math.cos(a*Math.PI/180);c.style.filter=`brightness(${.35+.65*Math.max(0,f)})`;c.style.zIndex=Math.round(f*100)})}
  if(visible)requestAnimationFrame(frame);else running=false};let running=false;
 view.addEventListener("pointerdown",e=>{drag=true;lx=e.clientX;moved=0;vel=0});
 window.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-lx;lx=e.clientX;moved+=Math.abs(dx);rot+=dx*0.25;vel=dx*0.25});
 window.addEventListener("pointerup",()=>{drag=false});
 ring.addEventListener("click",e=>{if(moved>8){e.preventDefault();e.stopPropagation()}},true);
 new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;if(visible&&!running){running=true;requestAnimationFrame(frame)}})).observe(view);
 addEventListener("resize",layout);layout();
})();

/* ---------- form ---------- */
const Form=(()=>{const state={step:0,service:null,size:null,timeline:null,budget:null,files:[],locked:false,design:null};
 const host=document.createElement("div");
 host.innerHTML=`<div class="f3d"><div class="ghost g2"></div><div class="ghost g1"></div><form class="fcard" novalidate><div class="fhead"><div class="t"><img data-k="logo" data-eager alt=""><div><b class="fTitle">Request a Project Estimate</b></div></div><span class="fstepn">Step 1 of 4</span></div><div class="fprog"><i></i><i></i><i></i><i></i></div><div class="fstage"></div></form></div>`;
 const f3d=host.firstElementChild,card=$("form",f3d),stage=$(".fstage",f3d);
 const tile=(id,label,sub,icon,sel)=>`<button type="button" class="tile${sel?" sel":""}" data-v="${id}"><span class="tick">${CHECK}</span>${icon}<span><span class="tl">${label}</span>${sub?`<span class="ts">${sub}</span>`:""}</span></button>`;
 const SIZES=[["small","Quick repair","A fix or small job","sz-small"],["partial","Partial renovation","Part of a room or home","sz-partial"],["major","Major project","Remodel, roof, deck, structural","sz-major"],["build","New build or addition","Custom home, addition, casita","sz-build"]];
 const TIMES=["As soon as possible","1–3 months","3–6 months","6+ months","Just planning"];
 const BUDGETS=["Under $5k","$5k–$25k","$25k–$100k","$100k–$500k","$500k+","Not sure yet"];
 const lbl=id=>(FORM_SERVICES.find(s=>s.id===id)||{}).label||"";
 const BACK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
 function render(){const s=state.step;$$(".fprog i",f3d).forEach((p,i)=>p.classList.toggle("on",i<=s&&s<4));$(".fstepn",f3d).textContent=s<4?`Step ${s+1} of 4`:"Sent";let h="";
  if(s===0)h=`<p class="fq">What can we help with?</p><p>Pick the closest match. Small jobs are welcome.</p><div class="tiles">${FORM_SERVICES.map(o=>tile(o.id,o.label,"",tp(o.id),state.service===o.id)).join("")}</div>`;
  else if(s===1)h=`${state.service?`<span class="svc-pre"><img data-k="${TP[state.service]}" alt="">${lbl(state.service)}<button type="button" data-change>Change</button></span>`:""}<p class="fq">How big is the project?</p><p>A rough idea is fine.</p><div class="tiles t4">${SIZES.map(z=>tile(z[0],z[1],z[2],tp(z[3]),state.size===z[0])).join("")}</div><div class="fnav"><button type="button" class="fback" data-back>${BACK}Back</button><span></span></div>`;
  else if(s===2)h=`<p class="fq">Timing &amp; budget <span style="color:var(--mute2);font-weight:500">(optional)</span></p><p>Both optional. Skip if you're not sure.</p><div class="flabel">Preferred timeline <em>(optional)</em></div><div class="chips" data-group="timeline">${TIMES.map(t=>`<button type="button" class="chip${state.timeline===t?" sel":""}" data-v="${t}">${t}</button>`).join("")}</div><div class="flabel">Budget range <em>(optional)</em></div><div class="chips" data-group="budget">${BUDGETS.map(t=>`<button type="button" class="chip${state.budget===t?" sel":""}" data-v="${t}">${t}</button>`).join("")}</div><div class="fnav"><button type="button" class="fback" data-back>${BACK}Back</button><span style="display:flex;gap:14px;align-items:center"><button type="button" class="fskip" data-next>Skip</button><button type="button" class="btn btn-red" data-next>Continue ${ARROW}</button></span></div>`;
  else if(s===3)h=`<p class="fq">Where should we reach you?</p><p>We'll only use this to reply about your project.</p><div class="fields"><div class="fld"><input id="fName" autocomplete="name" placeholder=" " required><label for="fName">Full name</label></div><div class="fld"><input id="fPhone" type="tel" autocomplete="tel" inputmode="tel" placeholder=" " required><label for="fPhone">Phone number</label></div><div class="fld"><input id="fEmail" type="email" autocomplete="email" placeholder=" " required><label for="fEmail">Email</label></div><div class="fld"><input id="fLoc" autocomplete="address-level2" placeholder=" " required><label for="fLoc">Project location (city or ZIP)</label></div><div class="fld full"><textarea id="fDesc" placeholder=" " required></textarea><label for="fDesc">Short project description</label></div><label class="drop"><input type="file" class="fFiles" accept="image/*" multiple hidden><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m21 17-5-5-8 8"/></svg></span><span><b>Add photos <span style="font-weight:500;color:var(--mute)">(optional)</span></b></span></label><div class="thumbs"></div></div><div class="fnav"><button type="button" class="fback" data-back>${BACK}Back</button><button type="submit" class="btn btn-red">Request My Estimate ${ARROW}</button></div>`;
  else{const n=(state.name||"").split(" ")[0];h=`<div class="fdone"><div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></div><h4>Thanks${n?`, ${n}`:""}. We've got it.</h4><p>Your ${(lbl(state.service)||"project").toLowerCase()} request is with the AZ Atlas team. We'll be in touch soon. Need us sooner?</p><a class="btn btn-ink" data-tel>Call <span data-phone></span></a><p style="margin-top:14px"><button type="button" class="fskip" data-restart>Send another request</button></p></div>`}
  if(state.design&&s<4)h=`<div class="design-chip"><b>3D</b><span>${state.design.replace(/^3D design: /,"")}</span></div>`+h;
  stage.innerHTML=h;setContacts(stage);setImgs(stage);if(s===3)bind3()}
 function go(dir){const h0=card.offsetHeight;card.style.height=h0+"px";stage.classList.add(dir>0?"out":"back-out");
  setTimeout(()=>{state.step+=dir;render();stage.classList.remove("out","back-out");stage.classList.add(dir>0?"pre":"back-pre");void stage.offsetWidth;stage.classList.remove("pre","back-pre");
   card.style.height="auto";const h1=card.offsetHeight;card.style.height=h0+"px";void card.offsetHeight;card.style.height=h1+"px";setTimeout(()=>{card.style.height=""},480);
   const top=f3d.getBoundingClientRect().top,off=innerWidth<720?84:96;if(top<off-10||top>innerHeight*.5)window.scrollTo({top:scrollY+top-off,behavior:"smooth"})},330)}
 function bind3(){const inp=$(".fFiles",stage),drop=$(".drop",stage),th=$(".thumbs",stage);
  const show=()=>{th.innerHTML="";state.files.slice(0,8).forEach(f=>{const r=new FileReader();r.onload=e=>{const i=new Image();i.src=e.target.result;th.appendChild(i)};r.readAsDataURL(f)})};
  inp.addEventListener("change",()=>{state.files=[...state.files,...inp.files];show()});
  ["dragenter","dragover"].forEach(t=>drop.addEventListener(t,e=>{e.preventDefault();drop.classList.add("over")}));
  ["dragleave","drop"].forEach(t=>drop.addEventListener(t,e=>{e.preventDefault();drop.classList.remove("over")}));
  drop.addEventListener("drop",e=>{state.files=[...state.files,...[...e.dataTransfer.files].filter(f=>f.type.startsWith("image/"))];show()});
  if(state.files.length)show();
  $$(".fld input,.fld textarea",stage).forEach(i=>i.addEventListener("input",()=>i.parentElement.classList.remove("err")))}
 card.addEventListener("click",e=>{const t=e.target.closest("[data-v],[data-next],[data-back],[data-change],[data-restart]");if(!t)return;
  if(t.matches(".tile")){const v=t.dataset.v;$$(".tile",stage).forEach(x=>x.classList.toggle("sel",x===t));if(state.step===0)state.service=v;else state.size=v;setTimeout(()=>go(1),260);return}
  if(t.matches(".chip")){const g=t.parentElement.dataset.group;state[g]=state[g]===t.dataset.v?null:t.dataset.v;$$(".chip",t.parentElement).forEach(x=>x.classList.toggle("sel",state[g]===x.dataset.v));return}
  if(t.hasAttribute("data-next"))go(1);else if(t.hasAttribute("data-back"))go(-1);
  else if(t.hasAttribute("data-change")){state.step=1;go(-1)}
  else if(t.hasAttribute("data-restart")){Object.assign(state,{size:null,timeline:null,budget:null,files:[]});state.step=state.locked?1:0;if(!state.locked)state.service=null;render()}});
 card.addEventListener("submit",async e=>{e.preventDefault();let bad=false;
  ["fName","fPhone","fEmail","fLoc","fDesc"].forEach(id=>{const i=$("#"+id,stage);let ok=i.value.trim().length>1;if(id==="fEmail")ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim());if(id==="fPhone")ok=i.value.replace(/\D/g,"").length>=10;i.parentElement.classList.toggle("err",!ok);if(!ok)bad=true});
  if(bad){const f=$(".fld.err input,.fld.err textarea",stage);f&&f.focus();card.animate([{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],{duration:320});return}
  const data={service:lbl(state.service),size:state.size,timeline:state.timeline,budget:state.budget,name:$("#fName",stage).value.trim(),phone:$("#fPhone",stage).value.trim(),email:$("#fEmail",stage).value.trim(),location:$("#fLoc",stage).value.trim(),description:$("#fDesc",stage).value.trim(),photos:state.files.length,design:state.design||"",source:location.href};
  state.name=data.name;
  if(CONFIG.formEndpoint){try{const fd=new FormData();Object.entries(data).forEach(([k,v])=>fd.append(k,v??""));state.files.forEach(f=>fd.append("photos",f));await fetch(CONFIG.formEndpoint,{method:"POST",body:fd})}catch(err){console.warn("Form send failed",err)}}else console.log("[demo] estimate request",data);
  go(1)});
 f3d.addEventListener("mousemove",e=>{if(matchMedia("(hover:none)").matches)return;const r=f3d.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;f3d.style.setProperty("--ry",((x-.5)*8).toFixed(2)+"deg");f3d.style.setProperty("--rx",((.5-y)*7).toFixed(2)+"deg");card.style.setProperty("--mx",x*100+"%");card.style.setProperty("--my",y*100+"%")});
 f3d.addEventListener("mouseleave",()=>{f3d.style.setProperty("--ry","0deg");f3d.style.setProperty("--rx","0deg")});
 return{node:f3d,
  mount(target,preset){target.appendChild(f3d);setImgs(f3d);Object.assign(state,{files:[],size:null,timeline:null,budget:null});
   if(preset&&SVC[preset]){state.service=preset;state.locked=true;state.step=1}else{state.locked=false;state.step=0;state.service=null}
   $(".fTitle",f3d).textContent=preset&&SVC[preset]?SVC[preset].cta:"Request a Project Estimate";render()},
  design(slug,txt){state.design=txt;state.service=slug;state.size="build";state.locked=false;state.step=2;render();$(".fTitle",f3d).textContent=SVC[slug]?SVC[slug].cta:"Request a Project Estimate"},
  preset(slug){state.size=null;state.locked=false;if(SVC[slug]){state.service=slug;state.step=1}else{state.service=null;state.step=0}render();$(".fTitle",f3d).textContent=SVC[slug]?SVC[slug].cta:"Request a Repair or Remodeling Estimate"}};
})();

/* ---------- service page ---------- */
function renderService(slug){const s=SVC[slug];if(!s)return false;
 const lvl=n=>`<div class="lvl">${[1,2,3].map(i=>`<i class="${i<=n?"f":""}"></i>`).join("")}</div>`;
 const others=SERVICES.filter(x=>x.slug!==slug);
 const capOf=k=>(GALLERY.find(g=>g[0]===k)||[k,"",s.short])[2];
 $("#svc-view").innerHTML=`
 <section class="sp-hero"><div class="bg">${im(s.hero,s.name)}</div><div class="wrap">
  <div class="crumbs"><a href="/" data-home>Home</a><span>/</span><a href="#services" data-scroll="services">Services</a><span>/</span><span style="color:#fff">${s.short}</span></div>
  <h1>${s.h1}</h1><p class="sub">${s.sub}</p>
  <div class="row"><a class="btn btn-red" href="#sp-form" data-jump>${s.cta} ${ARROW}</a><a class="callink" data-tel><span class="lbl">Call</span> <span data-phone></span></a></div>
  </div></section>
 <section class="sec" style="background:var(--paper)"><div class="wrap">
  <div class="sec-head"><h2 class="h2 rv">Small fix or full project. <span class="soft">Same licensed team.</span></h2></div>
  <div class="tiers">${s.tiers.map((t,i)=>`<div class="tier rv d${i+1}"><b>${t[1]}</b><p>${t[2]}</p></div>`).join("")}</div></div></section>
 <section class="sec" style="background:var(--paper);padding-top:0"><div class="wrap sp-body">
  <div class="rv"><h2 class="h2" style="font-size:clamp(30px,3.4vw,46px);margin:0 0 18px">What to expect.</h2><p class="lead">${s.intro}</p>
   <ul class="incl">${s.incl.map(i=>`<li>${CHECK.replace('stroke-width="3"','stroke-width="2.4"')}<span>${i}</span></li>`).join("")}</ul>
   
   <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><a class="btn btn-red" href="#sp-form" data-jump>${s.cta}</a><a class="btn btn-line" data-tel>Call <span data-phone></span></a></div></div>
  <div class="sp-gal rv d2">${s.gal.map(g=>`<figure data-lb="${g}" data-cap="${capOf(g)}">${im(g,capOf(g))}</figure>`).join("")}</div></div></section>
 ${s.ba?`<section class="sec sp-ba"><div class="wrap"><div class="ba-layout" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center"><div><h2 class="h2">${BA[s.ba].title}</h2><p class="lead" style="color:rgba(255,255,255,.65);margin-top:16px">${BA[s.ba].desc}</p></div>
  <div class="ba-screen${BA[s.ba].v?"":" cmp"}" id="spScreen" style="width:100%;max-width:520px"><video muted loop playsinline preload="metadata"></video>${BA[s.ba].v?`<button class="ba-play" type="button" aria-label="Play video"><i><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg></i></button><div class="ba-modes" id="spModes"><span class="knob"></span><button class="on" data-m="vid">Watch</button><button data-m="cmp">Compare</button></div>`:""}<div class="ba-prog"><span>Before</span><i></i><span>After</span></div><div class="ba-stage"><img class="before" alt=""><img class="after" alt=""><span class="ba-lbl l">Before</span><span class="ba-lbl r">After</span><div class="ba-handle"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6-6 6 6 6M15 6l6 6-6 6"/></svg></i></div></div></div></div></div></section>`:""}
 <section class="sec sp-form" id="sp-form"><div class="wrap est-grid">
  <div class="est-copy rv"><h2 class="h2">Tell us about your ${s.short.toLowerCase()} project.</h2><p class="lead">Takes about a minute.</p>
   
   <div><p style="font-weight:640;margin-top:8px">Other services</p><div class="others">${others.map(o=>`<a href="${URLS[o.slug]}">${o.short}</a>`).join("")}</div></div></div>
  <div class="fwrap rv d2" id="formSvc"></div></div></section>`;
 setImgs($("#svc-view"));setContacts($("#svc-view"));
 if(s.ba){if(BA[s.ba].v)makePlayer($("#spScreen"),s.ba,null,$("#spModes"));else makeBA($(".ba-stage",$("#spScreen")),null,[s.ba])}
 Form.mount($("#formSvc"),slug);
 observe($("#svc-view"));return true}

/* ---------- router & clicks ---------- */
let pendingScroll=null;
addEventListener("hashchange",()=>{const m=location.hash.match(/^#\/service\/([\w-]+)/);if(m&&URLS[m[1]])location.replace(URLS[m[1]])});
function route(){
 if(PAGE){renderService(PAGE);document.body.classList.add("on-svc")}
 else{const m=location.hash.match(/^#\/service\/([\w-]+)/);if(m&&URLS[m[1]]){location.replace(URLS[m[1]]);return}
  Form.mount($("#formHome"));const qs=new URLSearchParams(location.search),pr=qs.get("preset");if(pr){Form.preset(pr);history.replaceState(null,"","/"+location.hash)}
  const h=location.hash.slice(1);if(h&&document.getElementById(h))setTimeout(()=>scrollToId(h),400)}
 closeMenu();requestAnimationFrame(onScroll)}
function scrollToId(id){const t=(id==="estimate"&&innerWidth<1080&&$("#formHome"))?$("#formHome"):document.getElementById(id);if(t&&t.id==="formHome"){window.scrollTo({top:t.getBoundingClientRect().top+scrollY-70,behavior:"smooth"});return}if(!t)return;window.scrollTo({top:t.getBoundingClientRect().top+scrollY-(id==="estimate"?64:56),behavior:"smooth"})}
document.addEventListener("click",e=>{const a=e.target.closest("a,button");if(!a)return;
 if(a.hasAttribute("data-scroll")){e.preventDefault();const id=a.dataset.scroll,pre=a.dataset.preset;if(pre&&!document.body.classList.contains("on-svc"))Form.preset(pre);
  if(PAGE){if(id==="estimate"&&!pre&&$("#sp-form")){$("#sp-form").scrollIntoView({behavior:"smooth"});closeMenu();return}location.href="/"+(pre?"?preset="+pre:"")+"#"+id;return}
  else{scrollToId(id);closeMenu()}return}
 if(a.hasAttribute("data-jump")){e.preventDefault();$("#sp-form").scrollIntoView({behavior:"smooth"});return}
 if(a.hasAttribute("data-home")&&HOME){e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});history.replaceState(null,"","/");closeMenu();return}});
document.addEventListener("click",e=>{const f=e.target.closest("[data-lb]");if(f)openLB(f)});

/* menu */
const mnav=$("#mnav");
$("#burger").addEventListener("click",()=>{$$("#mnav img[data-k]").forEach(load);mnav.classList.add("open");document.body.style.overflow="hidden"});
$("#mclose").addEventListener("click",closeMenu);
function closeMenu(){mnav.classList.remove("open");document.body.style.overflow="";$("#dd").classList.remove("open")}
$("#dd button").addEventListener("click",()=>$("#dd").classList.toggle("open"));
$("#dd").addEventListener("mouseenter",()=>$$("#mega img[data-k]").forEach(load),{once:true});$("#dd").addEventListener("focusin",()=>$$("#mega img[data-k]").forEach(load),{once:true});
mnav.addEventListener("click",e=>{if(e.target.closest("a[href^='/']"))closeMenu()});

/* lightbox */
const lbx=$("#lb");let lbList=[],lbI=0;
function openLB(f){lbList=$$("[data-lb]",f.closest("#gal,.sp-gal,#gprev")||document).filter(x=>!x.classList.contains("hide"));lbI=lbList.indexOf(f);showLB();lbx.classList.add("on")}
function showLB(){const f=lbList[lbI];if(!f)return;const k=f.dataset.lb,vv=$("video",lbx),ii=$("img",lbx);if(k[0]==="@"){ii.style.display="none";vv.style.display="block";vv.src=vsrc(k.slice(1));tryPlay(vv)}else{vv.pause();vv.removeAttribute("src");vv.style.display="none";ii.style.display="";ii.src=IMG[k]}$("p",lbx).textContent=f.dataset.cap||""}
lbx.addEventListener("click",e=>{if(e.target.closest(".pv")){lbI=(lbI-1+lbList.length)%lbList.length;showLB();return}if(e.target.closest(".nx")){lbI=(lbI+1)%lbList.length;showLB();return}if(e.target===lbx||e.target.closest(".x"))closeLB()});
function closeLB(){lbx.classList.remove("on");const vv=$("video",lbx);vv.pause()}
let lsx=0;lbx.addEventListener("touchstart",e=>lsx=e.touches[0].clientX,{passive:true});
lbx.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-lsx;if(Math.abs(dx)>50){lbI=(lbI+(dx<0?1:-1)+lbList.length)%lbList.length;showLB()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(lbx.classList.contains("on"))closeLB();else if($("#gov").classList.contains("on"))closeGallery();closeMenu()}if(lbx.classList.contains("on")){if(e.key==="ArrowRight"){lbI=(lbI+1)%lbList.length;showLB()}if(e.key==="ArrowLeft"){lbI=(lbI-1+lbList.length)%lbList.length;showLB()}}});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
function observe(root=document){$$(".rv,.steps",root).forEach(n=>io.observe(n))}

/* tilt on gallery tiles (desktop) */
if(matchMedia("(hover:hover)").matches){document.addEventListener("mousemove",e=>{const t=e.target.closest("[data-tilt]");if(!t)return;const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg)`});document.addEventListener("mouseout",e=>{const t=e.target.closest("[data-tilt]");if(t&&!t.contains(e.relatedTarget))t.style.transform=""})}

/* scroll + pointer driven 3D */
const nav=$("#nav"),mbar=$("#mbar"),heroBg=$("#heroBg"),heroIn=$("#heroIn"),chaps=$$(".chap");
let px=0,py=0,tx=0,ty=0;
addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;kick()},{passive:true});
function onScroll(){const y=scrollY,vh=innerHeight,onSvc=document.body.classList.contains("on-svc");
 nav.classList.toggle("solid",y>60);mbar.classList.toggle("on",y>vh*.6);
 if(onSvc)return;
 if(y<vh*1.2){const k=y/vh;heroIn.style.opacity=String(Math.max(0,1-k*1.3));}
 chaps.forEach(c=>{const r=c.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const p=Math.min(1,Math.max(0,(vh-r.top)/vh)),e=1-Math.pow(1-p,3),m=c.firstElementChild.firstElementChild,mob=innerWidth<720;
  m.style.setProperty("--ms",((mob?.88:.82)+(mob?.12:.18)*e).toFixed(4));m.style.setProperty("--cs",(1.18-.18*e).toFixed(4));m.classList.toggle("full",e>.995);
  const co=Math.min(1,Math.max(0,(p-.72)/.25));c.style.setProperty("--co",co.toFixed(3))});
 const fw=Form.node.parentElement;if(fw){const r=fw.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh-r.top)/(vh*.75)));Form.node.style.setProperty("--sx",((1-p)*26).toFixed(2)+"deg");Form.node.style.setProperty("--sz",((1-p)*-140).toFixed(0)+"px")}
 parEls.forEach(b=>{const rr=b.parentElement.getBoundingClientRect();if(rr.bottom<0||rr.top>vh)return;const k=(rr.top+rr.height/2-vh/2)/vh;b.style.transform=`translateY(${(k*-40).toFixed(1)}px)`});
 const col=colEl;if(col){const cr=col.getBoundingClientRect();if(cr.bottom>0&&cr.top<vh){const k=(cr.top+cr.height/2-vh/2)/vh;colCs.forEach(c=>{const d=+c.dataset.d;c.style.translate=`0 ${(k*d).toFixed(1)}px`})}}
}
const parEls=$$("[data-par] .bg"),colEl=$("#collage"),colCs=colEl?$$(".c",colEl):[];
let looping=false,lastY=-1,heroVis=HOME;
HOME&&new IntersectionObserver(es=>{heroVis=es[0].isIntersecting;if(heroVis)kick()}).observe($("#top"));
function kick(){if(!looping&&heroVis){looping=true;requestAnimationFrame(loop)}}
function loop(){if(!heroVis){looping=false;return}px+=(tx-px)*.08;py+=(ty-py)*.08;const y=scrollY;
 heroBg.style.transform=`translate3d(${(px*-24).toFixed(1)}px,${(py*-18+y*.25).toFixed(1)}px,0) scale(1.04)`;heroIn.style.transform=`rotateY(${(px*6).toFixed(2)}deg) rotateX(${(-py*5).toFixed(2)}deg) translateY(${(y*-.12).toFixed(1)}px)`;
 if(Math.abs(tx-px)+Math.abs(ty-py)<.001&&y===lastY){looping=false;return}lastY=y;requestAnimationFrame(loop)}
let sq=false;addEventListener("scroll",()=>{kick();if(!sq){sq=true;requestAnimationFrame(()=>{sq=false;onScroll()})}},{passive:true});
addEventListener("resize",onScroll);
/* mobile: gentle gyro-free tilt from scroll */

/* hero headline */
HOME&&(()=>{const h=$("#heroH");const wrapW=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const fr=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))fr.appendChild(document.createTextNode(w));else{const s=document.createElement("span");s.className="w";s.textContent=w;fr.appendChild(s)}});c.replaceWith(fr)}else if(c.nodeType===1)wrapW(c)})};
 wrapW(h);$$(".w",h).forEach((w,i)=>w.style.animationDelay=(.55+i*.07)+"s");requestAnimationFrame(()=>h.classList.add("go"))})();

window.AZ={Form,scrollToId};
setImgs();setContacts();observe();
HOME&&(()=>{const v=$("#heroVid");if(matchMedia("(prefers-reduced-motion:reduce)").matches||innerWidth<900)return;v.addEventListener("playing",()=>v.classList.add("on"),{once:true});v.src=HERO_VID;tryPlay(v);
 addEventListener("scroll",()=>{if(scrollY>innerHeight*1.2){if(!v.paused)v.pause()}else if(v.paused&&v.classList.contains("on"))v.play().catch(()=>{})},{passive:true})})();
route();kick();
