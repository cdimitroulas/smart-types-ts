# Tasks Checklist

List of things to try out before releasing this library

- [x] See how to deal with optional fields in `mkSmartObject`
- [ ] _NOT DOING_ \*Have a simple way to handle plain types in `mkSmartObject`
      (they should use `e.right` as the smart constructor by default)
- [ ] Setup documentation generation & document built-in smart types
- [x] Decide whether smart types should work from an `unknown` input or not.
      This could make it significantly easier to succeed in writing some of the complex types like MkSmartObject
- [ ] Setup Github Actions to run tests and potentially also do automated npm publishing one day
