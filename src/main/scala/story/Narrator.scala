package story

import Verbs._

class Narrator(val story: Story) {
  private val currentNode = story.startNode
  def start(): String = story.startNode.statement

  def input(response: String): String = {
    val words = response.split(' ').toList

    val verbOpt = findVerb(words)
    val nounOpt = findNoun(words)

    (verbOpt, nounOpt) match {
      case (Some(verb), Some(noun)) => handleMatch(verb, noun)
      case _                        => handleNoMatches(response)
    }
  }

  private def handleMatch(verb: Verb, noun: NounAndActions): String = {
    val nextNode = verb match {
      case Verbs.taste  => noun.taste
      case Verbs.touch  => noun.touch
      case Verbs.smell  => noun.smell
      case Verbs.look   => noun.look
      case Verbs.listen => noun.listen
    }
    nextNode.map(_.statement).getOrElse("What do you think you are doing?")
  }

  private def handleNoMatches(response: String) =
    response match {
      case "help" => "You need help?"
      case _      => "I don't understand"
    }

  private def findVerb(words: List[String]): Option[Verb] =
    Verbs.values.find(verb => words.contains(verb.toString()))

  private def findNoun(words: List[String]): Option[NounAndActions] = {
    this.currentNode.stuffToDo.headOption
  }

}
