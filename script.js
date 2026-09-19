const profile=document.getElementById("profile"),startBtn=document.getElementById("startBtn"),resetBtn=document.getElementById("resetBtn"),processBox=document.getElementById("process"),resultBox=document.getElementById("result"),errorBox=document.getElementById("error"),progress=document.getElementById("progress"),percentage=document.getElementById("percentage"),terminalLine=document.getElementById("terminalLine");
let timer=null;
const SIMULATION_TIME=300000;
const results=[
"ANÁLISE CONCLUÍDA: o cenário fictício foi processado com sucesso. Este resultado não representa nenhuma ação real contra o perfil inserido. ✅⚠️",
"ANÁLISE FINALIZADA: o ataque não pôde ser processado devido à alta quantidade de solicitações. Tente novamente. ❌"
];
function startSimulation(){
 const value=profile.value.trim(); errorBox.textContent="";
 if(!value){errorBox.textContent="> erro: insira um @usuário ou link para iniciar.";profile.focus();return}
 startBtn.disabled=true;profile.disabled=true;processBox.classList.remove("hidden");resultBox.classList.add("hidden");resetBtn.classList.add("hidden");
 let startTime=Date.now();terminalLine.textContent="> inicializando simulação...";
 const messages=["> validando entrada...","> criando ambiente virtual...","> processando dados...","> preparando sistema de bots...","> executando...","> finalizando..."];let messageIndex=0;
 timer=setInterval(()=>{const elapsed=Date.now()-startTime,percent=Math.min(elapsed/SIMULATION_TIME*100,100);progress.style.width=percent+"%";percentage.textContent=Math.floor(percent)+"%";
 if(percent>10&&messageIndex===0)terminalLine.textContent=messages[++messageIndex];
 if(percent>25&&messageIndex===1)terminalLine.textContent=messages[++messageIndex];
 if(percent>45&&messageIndex===2)terminalLine.textContent=messages[++messageIndex];
 if(percent>65&&messageIndex===3)terminalLine.textContent=messages[++messageIndex];
 if(percent>85&&messageIndex===4)terminalLine.textContent=messages[++messageIndex];
 if(percent>=100)finishSimulation();
 },300);
}
function finishSimulation(){clearInterval(timer);progress.style.width="100%";percentage.textContent="100%";terminalLine.textContent="> simulação concluída.";resultBox.textContent=results[Math.floor(Math.random()*results.length)];resultBox.classList.remove("hidden");resetBtn.classList.remove("hidden");startBtn.disabled=false}
resetBtn.addEventListener("click",()=>{clearInterval(timer);profile.value="";profile.disabled=false;startBtn.disabled=false;progress.style.width="0%";percentage.textContent="0%";processBox.classList.add("hidden");resultBox.classList.add("hidden");resetBtn.classList.add("hidden");errorBox.textContent="";terminalLine.textContent="> aguardando...";profile.focus()});
startBtn.addEventListener("click",startSimulation);profile.addEventListener("keydown",e=>{if(e.key==="Enter")startSimulation()});
