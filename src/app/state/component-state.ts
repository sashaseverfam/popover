import {
  createAction,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export type ComponentStateMap = Record<string, object>;

const initialState: ComponentStateMap = {};

export const updateComponentState = createAction(
  '[Component State] Update Component State',
  props<{ componentName: string; componentState: object }>(),
);

export const componentStateFeature = createFeature({
  name: 'componentState',
  reducer: createReducer(
    initialState,
    on(updateComponentState, (state, { componentName, componentState }) => ({
      ...state,
      [componentName]: componentState,
    })),
  ),
});

export const selectComponentState = createFeatureSelector<ComponentStateMap>(
  componentStateFeature.name,
);

export const selectComponentStateByName = (componentName: string) =>
  createSelector(selectComponentState, (state) => state[componentName]);
