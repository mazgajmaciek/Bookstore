package FunctionalTests;

import org.junit.Test;

public class BookAddTest extends FunctionalTest {
    @Test
    public void addBook() {
        driver.get("https://www.maciekmazgaj.com/bookstore/frontend/?action=books");

        BooksPage booksPage = new BooksPage(driver);

        //script for waiting for js load

        booksPage.addBookTitle("new_title");
        booksPage.addBookAuthor("Maciej Mazgaj");
        booksPage.addBookDesc("new_title_description");
        booksPage.addBook();
    }

    @Test
    public void editBook() {
        driver.get("https://www.maciekmazgaj.com/bookstore/frontend/?action=books");

        BooksPage booksPage = new BooksPage(driver);

    }

}
