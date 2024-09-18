import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const quotes = [
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "I have a dream that one day this nation will rise up and live out the true meaning of its creed: 'We hold these truths to be self-evident, that all men are created equal.'", author: "Martin Luther King Jr." },
  { text: "To be or not to be, that is the question.", author: "William Shakespeare" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { text: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", author: "Robert Frost" },
  { text: "Ask not what your country can do for you – ask what you can do for your country.", author: "John F. Kennedy" },
  { text: "I think, therefore I am.", author: "René Descartes" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Our lives begin to end the day we become silent about things that matter.", author: "Martin Luther King Jr." },
  { text: "Remember that not getting what you want is sometimes a wonderful stroke of luck.", author: "Dalai Lama" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "When the going gets tough, the tough get going.", author: "Joe Kennedy" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale" },
  { text: "I learned that courage was not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
  { text: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.", author: "Martin Luther King Jr." },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" },
  { text: "When I dare to be powerful, to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.", author: "Audre Lorde" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward.", author: "Martin Luther King Jr." },
  { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
  { text: "Imagination is the beginning of creation.", author: "George Bernard Shaw" },
  { text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop" },
  { text: "Whoever is happy will make others happy too.", author: "Anne Frank" },
  { text: "I have decided to stick with love. Hate is too great a burden to bear.", author: "Martin Luther King Jr." },
  { text: "We know what we are, but know not what we may be.", author: "William Shakespeare" },
  { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Keep your face always toward the sunshine - and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "All you need is love.", author: "John Lennon" },
  { text: "If you tell the truth, you don't have to remember anything.", author: "Mark Twain" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Aim for the moon. If you miss, you may hit a star.", author: "W. Clement Stone" },
  { text: "No pressure, no diamonds.", author: "Thomas Carlyle" },
  { text: "We must let go of the life we have planned, so as to accept the one that is waiting for us.", author: "Joseph Campbell" },
  { text: "If opportunity doesn't knock, build a door.", author: "Milton Berle" },
  { text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou" },
  { text: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", author: "Aristotle" },
  { text: "Take time to deliberate; but when the time for action arrives, stop thinking and go in.", author: "Andrew Jackson" },
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss" },
  { text: "If you don't like something, change it. If you can't change it, change your attitude.", author: "Maya Angelou" },
  { text: "Remember no one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
  { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
  { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
  { text: "There is no charm equal to tenderness of heart.", author: "Jane Austen" },
  { text: "All you need is the plan, the road map, and the courage to press on to your destination.", author: "Earl Nightingale" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { text: "Do what you can, where you are, with what you have.", author: "Teddy Roosevelt" },
  { text: "The future belongs to those who prepare for it today.", author: "Malcolm X" },
  { text: "Wise men speak because they have something to say; Fools because they have to say something.", author: "Plato" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "None of us is as smart as all of us.", author: "Ken Blanchard" },
  { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { text: "There is nothing impossible to him who will try.", author: "Alexander the Great" },
  { text: "What we achieve inwardly will change outer reality.", author: "Plutarch" },
  { text: "A happy family is but an earlier heaven.", author: "George Bernard Shaw" },
  { text: "To succeed in life, you need two things: ignorance and confidence.", author: "Mark Twain" },
  { text: "Joy is the simplest form of gratitude.", author: "Karl Barth" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "If you're going through hell, keep going.", author: "Winston Churchill" },
  { text: "The power of imagination makes us infinite.", author: "John Muir" },
  { text: "The harder I work, the luckier I get.", author: "Gary Player" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
];

export default function App() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/quote_sound.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Quotes Reminder</Text>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{currentQuote.text}</Text>
        <Text style={styles.authorText}>- {currentQuote.author}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.buttonText}>Play Quote</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getRandomQuote}>
        <Text style={styles.buttonText}>Next Quote</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quoteContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  authorText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
