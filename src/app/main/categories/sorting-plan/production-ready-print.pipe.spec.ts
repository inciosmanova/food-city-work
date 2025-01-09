import { ProductionReadyPrintPipe } from './production-ready-print.pipe';

describe('ProductionReadyPrintPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductionReadyPrintPipe();
    expect(pipe).toBeTruthy();
  });
});
