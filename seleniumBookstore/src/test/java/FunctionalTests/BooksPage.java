package FunctionalTests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;

public class BooksPage extends PageObject {
    @FindBy(id = "title")
    private WebElement titleField;

    @FindBy(id = "author_id")
    private Select authorSelect;

    @FindBy(id = "description")
    private WebElement descriptionField;

    @FindBy(id = "bookEditSelect")
    private WebElement bookEditSelect;

    @FindBy(xpath = "/html/body/div[1]/div[1]/div[2]/form/button")
    private WebElement addBookBtn;


    public BooksPage(WebDriver driver) {
        super(driver);
    }

    public void addBookTitle (String title) {
        titleField.clear();
        titleField.sendKeys(title);
    }

    public void addBookAuthor(String author_name) {
        this.authorSelect = new Select(driver.findElement(By.id("author_id")));
        authorSelect.selectByVisibleText(author_name);
        //Select array to pull by 1st array element, not visibleText
    }

    public void addBookDesc(String description) {
        this.descriptionField.clear();
        this.descriptionField.sendKeys(description);
    }

    public void addBook (){
//        this.addBookBtn = driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/form/button"));
        addBookBtn.click();
    }

//    public void editBook() {
//        this
//    }

}
