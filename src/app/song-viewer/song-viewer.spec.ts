import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongViewer } from './song-viewer';

describe('SongViewer', () => {
  let component: SongViewer;
  let fixture: ComponentFixture<SongViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(SongViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
