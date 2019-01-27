var repository = [
    {name: "Pikachu", height: 0.4, types: ['electric']}, 
    {name: "Charmander", height: 0.6, types: ['fire']},
    {name: "Magikarp", height: '0.9', types: ['water']}];


for (i=0; i < repository.length; ++i) {
    document.write(repository[i].name + " (height: " + repository[i].height + ")");
    if (repository[i].height > 0.7) {
        document.write(" - Wow, that's big!");
    }
    document.write("<BR>" + "<BR>");

}
