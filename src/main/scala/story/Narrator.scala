package story

import Verbs._

class Narrator(val story: Story) {
  private val currentNode: NormalNode = story.startNode
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
    nextNode match {
      case Some(NormalNode(statement, _)) => statement
      case Some(DeathNode(statement))     => s"$statement You died! x_x"
      case Some(WinNode(statement))       => s"$statement You won! °˖✧◝(⁰▿⁰)◜✧˖°"
      case _                              => s"You can't do that to a ${noun.item}."
    }
  }

  private def handleNoMatches(response: String) =
    response match {
      case "help" => "You need help?"
      case _      => "I don't understand"
    }

  private def findVerb(words: List[String]): Option[Verb] =
    Verbs.values.find(verb => words.contains(verb.toString()))

  private def findNoun(words: List[String]): Option[NounAndActions] =
    this.currentNode.stuffToDo.find(stuffToDo => words.contains(stuffToDo.item))

}
