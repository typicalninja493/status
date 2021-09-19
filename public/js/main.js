

let Gtimer;


const statuses = {
	OFFLINE: 'Offline',
	DEGRADED: 'Degraded Performance',
	ONLINE: 'Working as Usual'
}

function updateElements(apiResult) {
	const container = document.getElementById('status');
	container.innerHTML = ""
	apiResult.forEach((result) => {
		const card = document.createElement('div');
		// Construct card content
		const content = `
		<div class="">
		<div class="${result.state == 'ONLINE' ? 'bg-green-300' : result.state == 'DEGRADED' ? 'bg-yellow-300' : 'bg-red-300'} max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer" >
		<div class="${result.state == 'ONLINE' ? 'bg-green-700' : result.state == 'DEGRADED' ? 'bg-yellow-700' : 'bg-red-700'}  flex h-20  items-center">
		<h1 class="text-white ml-4 border-2 py-2 px-4 rounded-full">${result.siteName}</h1>
		</div>
		  <p class="py-6 px-6 text-lg tracking-wide text-center">Status: ${statuses[result.state]}</p>
		  <p class="py-2 px-6 text-lg tracking-wide text-center">Response Time: ${result.responseTime} ms</p>
		</div>
		</div>
		`;
		container.innerHTML += content;
	});
}

async function requestResults() {
	const url = '/api/status'
   const r = await fetch(url).then(r => r.json())

   return r.list;
}

function startTimer(duration = 60 * 2, display) {
	if(Gtimer) clearInterval(Gtimer);
    var timer = duration, minutes, seconds;
    Gtimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


async function update() {
	console.log('update commencing')
	const apiResults = await requestResults()
	let display = document.querySelector('#countdown');

	startTimer(60 * 2, display);
	updateElements(apiResults);
}

window.onload = async () => {
	await update()
 setInterval(async () => {
	await update()
 }, 120000)
}

/*
	const content = `
		  <div class="card bg-red-400">
		  <div class="card-header" id="heading-${idx}">
			<h5 class="mb-0">
			  <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${idx}" aria-expanded="true" aria-controls="collapse-${idx}">
	  
					  </button>
			</h5>
		  </div>
	  
		  <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
			<div class="card-body">
	  
			  <h5>${result.url}</h5>
			  <p>${result.state}</p>
			  <p>${result.responseTime}</p>
			  ...
			</div>
		  </div>
		</div>
		`;


			<div class="container mx-auto">
    <div class="${result.state == 'ONLINE' ? 'bg-green-700' : result.state == 'DEGRADED' ? 'bg-yellow-700' : 'bg-red-700'} max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
      <div class="h-20 shadow ${result.state == 'ONLINE' ? 'bg-green-400' : result.state == 'DEGRADED' ? 'bg-yellow-400' : 'bg-red-400'} flex items-center justify-between">
        <p class="mr-20 text-white text-lg">${result.siteName}</p>
      </div>

      <p class="py-6 text-lg tracking-wide ml-16">Description of what is done here</p>
      <div class="flex justify-between px-5 mb-2 text-sm text-gray-600">
        <p>Last Update</p>
        <p>3/08/2021</p>
      </div>
    </div>
	</div>
*/