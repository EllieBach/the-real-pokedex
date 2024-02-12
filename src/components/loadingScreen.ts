import { searchMenu } from "./searchMenu";

const app = document.querySelector<HTMLDivElement>('#app')!;

   const myTimer = setTimeout(() => {
  // Efter timern är över fortsätter koden i FinishLoading()
  finishLoading();
}, 3000);  
 
export function startLoading() {
  app.innerHTML = "";
  const centerCont: HTMLDivElement = document.createElement("div");
  centerCont.classList.add("center");
  const title: HTMLElement = document.createElement("h1");
  title.innerText = "Pokédex";
  title.classList.add('loadingTitle');
  const imgElement: HTMLImageElement = document.createElement("img");
  imgElement.src = "/pokeball.svg";
  imgElement.classList.add("logo");
  const subTitle: HTMLElement = document.createElement("p");
  subTitle.classList.add('loadingSubtext');
  subTitle.innerText = "Gotta Catch 'em All!";
  centerCont.append(title, imgElement, subTitle);
  app.append(centerCont);
  
  myTimer;  

} 

function finishLoading() {
  app.innerHTML = "";
  searchMenu();
}