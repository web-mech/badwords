.PHONY: test build docs

test:
	@yarn test

build:
	@yarn build

docs:
	@yarn docs && yarn typedoc
