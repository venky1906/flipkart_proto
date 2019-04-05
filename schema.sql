-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema flipkartdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flipkartdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flipkartdb` DEFAULT CHARACTER SET utf8 ;
USE `flipkartdb` ;

-- -----------------------------------------------------
-- Table `flipkartdb`.`Buyer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Buyer` (
  `buyer_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone_no` VARCHAR(10) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `pic_location` VARCHAR(80) NULL,
  `gender` ENUM('F', 'M', 'others') NOT NULL,
  PRIMARY KEY (`buyer_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `phone_no_UNIQUE` (`phone_no` ASC),
  UNIQUE INDEX `pic_location_UNIQUE` (`pic_location` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`BuyerAddress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`BuyerAddress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `buyer_id` INT NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL DEFAULT 'home',
  `type` ENUM('DEFAULT', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_BuyerAddress_1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `flipkartdb`.`Buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cat_img` VARCHAR(90) NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`SubCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`SubCategory` (
  `subcategory_id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `subcat_img` VARCHAR(90) NULL,
  PRIMARY KEY (`subcategory_id`),
  CONSTRAINT `fk_SubCategory_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `flipkartdb`.`Category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Seller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Seller` (
  `seller_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone_no` VARCHAR(10) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `pic_location` VARCHAR(80) NULL,
  `gst_info` VARCHAR(45) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `gender` ENUM('F', 'M', 'others') NULL,
  PRIMARY KEY (`seller_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `phone_no_UNIQUE` (`phone_no` ASC),
  UNIQUE INDEX `pic_location_UNIQUE` (`pic_location` ASC),
  UNIQUE INDEX `gst_info_UNIQUE` (`gst_info` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Brand` (
  `brand` VARCHAR(50) NOT NULL,
  `subcategory_id` INT NOT NULL,
  `brand_img` VARCHAR(90) NULL,
  INDEX `fk_Brand_1_idx` (`subcategory_id` ASC),
  PRIMARY KEY (`brand`, `subcategory_id`),
  CONSTRAINT `fk_Brand_1`
    FOREIGN KEY (`subcategory_id`)
    REFERENCES `flipkartdb`.`SubCategory` (`subcategory_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(10) NOT NULL,
  `name` VARCHAR(90) NOT NULL,
  `subcategory_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `description` VARCHAR(90) NULL,
  `manufacture_date` DATE NOT NULL,
  `color` VARCHAR(45) NULL,
  `discount` FLOAT NULL DEFAULT 0,
  `seller_id` INT NULL,
  `status` ENUM('EXISTS', 'DELETED') NOT NULL DEFAULT 'EXISTS',
  PRIMARY KEY (`item_id`),
  INDEX `fk_Item_1_idx` (`subcategory_id` ASC),
  INDEX `fk_Item_2_idx` (`seller_id` ASC),
  UNIQUE INDEX `index4` (`id` ASC, `seller_id` ASC),
  INDEX `fk_Item_3_idx` (`brand` ASC),
  CONSTRAINT `fk_Item_1`
    FOREIGN KEY (`subcategory_id`)
    REFERENCES `flipkartdb`.`SubCategory` (`subcategory_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_2`
    FOREIGN KEY (`seller_id`)
    REFERENCES `flipkartdb`.`Seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_3`
    FOREIGN KEY (`brand`)
    REFERENCES `flipkartdb`.`Brand` (`brand`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`ItemImages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`ItemImages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `image_location` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ItemImages_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`ItemDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`ItemDetails` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `item_key` VARCHAR(75) NOT NULL,
  `item_value` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ItemDetails_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`OrderItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`OrderItem` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `amount_paid` FLOAT NOT NULL,
  `status` ENUM('paymentdone', 'shipped', 'delivered', 'paymentsent', 'cancelled') NOT NULL,
  `order_date` DATETIME NOT NULL,
  INDEX `fk_OrderItem_2_idx` (`item_id` ASC),
  INDEX `fk_OrderItem_3_idx` (`seller_id` ASC),
  PRIMARY KEY (`order_id`),
  INDEX `fk_OrderItem_4_idx` (`address_id` ASC),
  INDEX `fk_OrderItem_5_idx` (`buyer_id` ASC),
  CONSTRAINT `fk_OrderItem_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrderItem_3`
    FOREIGN KEY (`seller_id`)
    REFERENCES `flipkartdb`.`Seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrderItem_4`
    FOREIGN KEY (`address_id`)
    REFERENCES `flipkartdb`.`BuyerAddress` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrderItem_5`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `flipkartdb`.`Buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orderItem_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  `rating` ENUM('1', '2', '3', '4', '5') NOT NULL,
  `review` VARCHAR(90) NULL,
  INDEX `fk_Review_2_idx` (`item_id` ASC),
  INDEX `fk_Review_3_idx` (`seller_id` ASC),
  PRIMARY KEY (`id`),
  INDEX `fk_Review_4_idx` (`orderItem_id` ASC),
  CONSTRAINT `fk_Review_1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `flipkartdb`.`Buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_3`
    FOREIGN KEY (`seller_id`)
    REFERENCES `flipkartdb`.`Seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_4`
    FOREIGN KEY (`orderItem_id`)
    REFERENCES `flipkartdb`.`OrderItem` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Deal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Deal` (
  `deal_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(90) NOT NULL,
  `deal_discount` FLOAT NOT NULL DEFAULT 0,
  `validity` INT NOT NULL DEFAULT 1,
  `date_added` DATETIME NOT NULL,
  `deal_img` VARCHAR(80) NULL,
  PRIMARY KEY (`deal_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`DealItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`DealItem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `deal_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_DealItem_2_idx` (`item_id` ASC),
  CONSTRAINT `fk_DealItem_1`
    FOREIGN KEY (`deal_id`)
    REFERENCES `flipkartdb`.`Deal` (`deal_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DealItem_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`BuyerAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`BuyerAccount` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `accountno` VARCHAR(12) NOT NULL,
  `buyer_id` INT NOT NULL,
  `pin` VARCHAR(4) NOT NULL,
  `balance` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_BuyerAccount_1_idx` (`buyer_id` ASC),
  UNIQUE INDEX `accountno_UNIQUE` (`accountno` ASC),
  CONSTRAINT `fk_BuyerAccount_1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `flipkartdb`.`Buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`SellerAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`SellerAccount` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `accountno` VARCHAR(12) NOT NULL,
  `seller_id` INT NOT NULL,
  `pin` VARCHAR(4) NOT NULL,
  `balance` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_SellerAccount_1_idx` (`seller_id` ASC),
  UNIQUE INDEX `accountno_UNIQUE` (`accountno` ASC),
  CONSTRAINT `fk_SellerAccount_1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `flipkartdb`.`Seller` (`seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`WishlistItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`WishlistItem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `buyer_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_WishlistItem_1_idx` (`buyer_id` ASC),
  CONSTRAINT `fk_WishlistItem_1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `flipkartdb`.`Buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_WishlistItem_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`Cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`Cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `buyer_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_Cart_2_idx` (`item_id` ASC),
  CONSTRAINT `fk_Cart_1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `flipkartdb`.`Buyer` (`buyer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cart_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `flipkartdb`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flipkartdb`.`FlipkartAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flipkartdb`.`FlipkartAccount` (
  `accountno` VARCHAR(12) NOT NULL,
  `balance` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`accountno`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `flipkartdb`.`Buyer`
-- -----------------------------------------------------
START TRANSACTION;
USE `flipkartdb`;
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (1, 'Deepika Alavala', 'Deepika.Alavala@iiitb.org', '9611529722', '12345', 'images/buyers/deepika.jpg', 'F');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (2, 'Sravya Gangishetty', 'G.Sravya@iiitb.org', '7730069061', '12345', 'images/buyer/sravya.jpg', 'F');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (3, 'Mahith Bhima', 'Mahith.Bhima@iiitb.org', '7022386529', '12345', 'images/buyer/mahith.jpg', 'M');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (4, 'Pranith Reddy', 'Pranith.Reddy@iiitb.org', '8121390529', '12345', 'images/buyer/pranith.jpg', 'M');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (5, 'Karthikeya Reddy', 'Karthikeya.Reddy@iiitb.org', '8722356778', '12345', 'images/buyer/karthik.jpg', 'M');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (6, 'Venkateswara Rao', 'Raghavarapu.Venkateswararao@iiitb.org', '7899003569', '12345', 'images/buyer/venky.jpg', 'M');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (7, 'Sowmya Dasari', 'Sowmya.Dasari', '7795268399', '12345', 'images/buyer/sowmya.jpg', 'F');
INSERT INTO `flipkartdb`.`Buyer` (`buyer_id`, `name`, `email`, `phone_no`, `password`, `pic_location`, `gender`) VALUES (8, 'Praneeth Reddy', 'Praneeth.Reddy@iiitb.org', '8309939709', '12345', 'images/buyer/praneeth.jpg', 'M');

COMMIT;


-- -----------------------------------------------------
-- Data for table `flipkartdb`.`BuyerAddress`
-- -----------------------------------------------------
START TRANSACTION;
USE `flipkartdb`;
INSERT INTO `flipkartdb`.`BuyerAddress` (`id`, `buyer_id`, `address`, `name`, `type`) VALUES (1, 1, 'IIIT Bangalore', 'College', 'DEFAULT');
INSERT INTO `flipkartdb`.`BuyerAddress` (`id`, `buyer_id`, `address`, `name`, `type`) VALUES (2, 2, 'IIIT Bangalore', 'College', 'DEFAULT');
INSERT INTO `flipkartdb`.`BuyerAddress` (`id`, `buyer_id`, `address`, `name`, `type`) VALUES (3, 3, 'IIIT Bangalore', 'Home', 'GENERAL');
INSERT INTO `flipkartdb`.`BuyerAddress` (`id`, `buyer_id`, `address`, `name`, `type`) VALUES (4, 4, 'IIITB', 'Home', 'GENERAL');

COMMIT;


-- -----------------------------------------------------
-- Data for table `flipkartdb`.`FlipkartAccount`
-- -----------------------------------------------------
START TRANSACTION;
USE `flipkartdb`;
INSERT INTO `flipkartdb`.`FlipkartAccount` (`accountno`, `balance`) VALUES ('334455667788', 1000);

COMMIT;

