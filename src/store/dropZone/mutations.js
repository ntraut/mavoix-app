import { modelToTabItem, itemIndex } from './utils'

/**
 * Set tab's color.
 * @param {State} state current state.
 * @param {Number} hexColor tab's color
 */
export const setTabColor = (state, color) => {
  state.tab.color = color
}

export const setTabSlug = (state, slug) => {
  state.tab.slug = slug
}

export const setTabId = (state, id) => {
  state.tab.id = id
}

/**
 * Set tab items
 * @param {State} state current state.
 * @param {[TabItemModel]} itemsModels array of tab's items model.
 */
export const setItems = (state, itemsModels) => {
  state.items = itemsModels.map((itemModel) => {
    return modelToTabItem(itemModel)
  })
}
/**
 * Add a tab item.
 * @param {State} state current state.
 * @param {TabItemModel} itemModel tab's item model.
 */
export const addItem = (state, itemModel) => {
  state.items.push(modelToTabItem(itemModel))
}
/**
 * Update a tab item.
 * @param {State} state current state.
 * @param {TabItemModel} itemModel tab's item model.
 */
export const updateItem = (state, itemModel) => {
  const item = modelToTabItem(itemModel)
  const index = itemIndex(item, state.items)

  state.items[index].name = item.name
  state.items[index].asset = item.asset
  state.items[index].available = item.available
  state.items[index].hidden = item.hidden
  state.items[index].order = item.order

  state.items.sort((a, b) => a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
}
/**
 * Delete a tab item.
 * @param {State} state current state.
 * @param {TabItemModel} itemModel tab's item model.
 */
export const deleteItem = (state, itemModel) => {
  state.items.splice(itemIndex(modelToTabItem(itemModel), state.items), 1)
}

export const setActiveItems = (state, items) => {
  state.activeItems = []
}

export const clearActiveItems = (state) => {
  state.activeItems.forEach((activeItem) => {
    if (activeItem.tabSlug === state.tab.slug) {
      state.items.push(activeItem)
    }
  })
  state.items.sort((a, b) => a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
  state.activeItems = []
}

export const drop = (state, { item, zone }) => {
  let i = itemIndex(item, state.items)
  if (i !== -1) {
    state.items.splice(i, 1)
  }
  i = itemIndex(item, state.activeItems)
  if (i !== -1) {
    state.activeItems.splice(i, 1)
  }
  if (zone === 'passiv' && item.tabSlug === state.slug) {
    state.items.push(item)
    state.items.sort((a, b) => a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
  } else if (zone === 'active') {
    state.activeItems.push(item)
  }
}

export const setSubscription = (state, subscription) => {
  state.subscription = subscription
}

/**
 * Set an error
 * @param {State} state current state
 * @param {*} error an error to print
 */
export const setError = (state, error) => {
  console.error(error)
  state.error = error
}
