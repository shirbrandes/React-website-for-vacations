create database project;
use project;

create table users(
	firstName varchar(255),
    lastName varchar(255),
    userName varchar(255),
    password varchar(255),
    id int auto_increment,
    role varchar(255) default "user",
    primary key(id)
);

create table vacations (
	destination varchar(255),
    description varchar(255),
    img varchar(255),
	id int auto_increment,
    dateFrom date,
    dateUntill date,
    price int,
    followers int default 0,
    primary key(id)
    );

create table followers(
	id int auto_increment, 
    userid int,
    vacationid int,
	primary key(id),
	foreign key(userid) references users(id),
    foreign key(vacationid) references vacations(id)
);

insert into users (firstName,lastName,userName,password,role)
values ("shir","brandes","shirbrandes","1234","user"),
("guy","moshe","guymoshe","123","user"),
("miri","shahar","mirishahar","123456","user"),
("admin","amini","admin","admin", "admin");


INSERT INTO vacations (destination,description, img, dateFrom, dateUntill, price) 
VALUES ('London', 'The culture city in Europe', 'https://www.masa.co.il/wp-content/uploads/2017/11/london-tips.jpg', '2022-01-01', '2022-01-07', 1000);

INSERT INTO vacations (destination,description, img, dateFrom, dateUntill, price) 
VALUES ('Paris', 'The most romantic city', 'https://m.issta.co.il/_resources/images/destinations/france/Paris//640X384/1.jpg', '2022-01-10', '2022-01-15', 1200);

INSERT INTO vacations (destination,description, img, dateFrom, dateUntill, price) 
VALUES ('Rome', 'An imaginary cultural city', 'https://s3.eu-west-1.amazonaws.com/cdnmedia.rimon-tours.co.il/wp-content/uploads/2018/12/iStock-161835510.jpg', '2022-01-12', '2022-01-15', 800);

INSERT INTO vacations (destination,description, img, dateFrom, dateUntill, price) 
VALUES ('Dubai', 'The city of luxury', 'https://www.kishrey-teufa.co.il/clients/kishreyteufa/gallery/dubai/Dubaikidum_m%20%2815%29.jpg', '2022-01-03', '2022-01-012', 2000);

INSERT INTO vacations (destination,description, img, dateFrom, dateUntill, price) 
VALUES ('Prague', 'One of the most visited cities in Europe', 'https://m.issta.co.il/_resources/images//destinations/czech_republic/prague//1280X768/10.jpg', '2022-01-01', '2022-01-05', 750);




