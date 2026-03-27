import java.util.Random;

public class test{
    
    public static void main(String[] args) {
        printRandomNumbers(10);
        rollDice();
        guessTheNumber();
    }
    
    // Generate and print random numbers
    public static void printRandomNumbers(int count) {
        Random random = new Random();
        System.out.println("Random numbers: ");
        for (int i = 0; i < count; i++) {
            System.out.println(random.nextInt(100) + 1);
        }
    }
    
    // Roll a dice
    public static void rollDice() {
        Random random = new Random();
        int roll = random.nextInt(6) + 1;
        System.out.println("Dice roll: " + roll);
    }
    
    // Guess the number game
    public static void guessTheNumber() {
        Random random = new Random();
        int secretNumber = random.nextInt(100) + 1;
        System.out.println("Secret number generated between 1-100");
    }
}
