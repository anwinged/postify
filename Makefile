build-xpi:
	rm -f postify.xpi
	zip -r -FS ./postify.xpi * \
		--exclude '*.git*' \
		--exclude '*.php' \
		--exclude '*.xpi'
