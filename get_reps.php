url="http://whoismyrepresentative.com/getall_mems.php?output=json&zip="

for i in range(0, 99999):
	curl  url + str(i)

	# 'http://whoismyrepresentative.com/getall_mems.php?output=json&zip=31023'