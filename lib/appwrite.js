//make new set
  export async function createKanjiSet(kanjiList) {
    try {
      const newSet = [await kanjiSet.create(
        words = kanjiList.split(",").trim().forEach(character => console.log(character))
      )];
      
  
      if (!newSet) throw Error;
  
  
      return newSet;
    } catch (error) {
      throw new Error(error);
    }
  }