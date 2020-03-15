import { Story, Verb, VERBS, Node, StoryOption } from "../types";
import { head } from "ramda";

class Narrator {
  constructor(private story: Story, private currentNode: Node) {}

  public handleNonMatch = (response: string): string => {
    if (response.includes("help")) {
      return "Try interacting with an item e.g. touch bag or smell tomato.";
    }

    if (response.includes("look around")) {
      return this.lookAroundDescription();
    }

    return "You cannot do that. Maybe try asking to 'look around' if you are stuck.";
  };

  public getNext = (response: string): Node | undefined => {
    const words = response.split(" ");

    const verbOpt = this.findVerb(words);
    const nounOpt = this.findNoun(words);

    if (verbOpt !== undefined && nounOpt !== undefined) {
      return this.handleMatch(verbOpt, nounOpt);
    } else {
      return undefined;
    }
  };

  private handleMatch = (verb: Verb, noun: StoryOption): Node | undefined => {
    switch (verb) {
      case "listen":
        return this.findNounById(noun.listenId);
      case "look":
        return this.findNounById(noun.lookId);
      case "smell":
        return this.findNounById(noun.smellId);
      case "taste":
        return this.findNounById(noun.tasteId);
      case "touch":
        return this.findNounById(noun.touchId);
    }
  };

  private findNounById = (id?: string) =>
    this.story.nodes.find(n => n.id === id);

  private stuffToDo = (): StoryOption[] =>
    this.story.options.filter(option =>
      this.currentNode.optionIds.includes(option.id)
    );

  private findVerb = (words: string[]): Verb | undefined =>
    VERBS.find(verb => words.includes(verb));

  private findNoun = (words: string[]): StoryOption | undefined =>
    this.stuffToDo().find(s => words.includes(s.item));

  private lookAroundDescription = (): string => {
    const items = this.stuffToDo().map(
      stuff => `${aOrAn(stuff.item)} ${stuff.item}`
    );
    if (items.length === 0) {
      return "There is nothing to look at.";
    }
    return `You can see ${items.join(" and ")}.`;
  };
}

const aOrAn = (word: string): string => {
  const vowels = "aeiou";
  const firstLetter = head(word);

  if (vowels.includes(firstLetter)) {
    return "an";
  }
  return "a";
};

export default Narrator;
