use CompanyX;
CREATE TABLE jobs735 (
jobId VARCHAR(45) NOT NULL,
partId INT NOT NULL,
qty INT NOT NULL,
PRIMARY KEY(jobId, partId));

Insert into jobs735 values ('job930',930,99);
Insert into jobs735 values ('job691',691,66),('job383',383,33),('job735',735,77),('job705',705,78), ('job541',541,55);

select * from jobs735 where jobId = 'j1735' and partId = 1735;
update jobs735 set qty = 90 where jobId = 'j1735' and partId = 1735;

select * from jobs735;