package story

object Formatter {
  private val vowels = "aeiou"

  def aOrAn(word: String): String =
    if (word.headOption.map(vowels.contains(_)).getOrElse(false)) "an" else "a"
}
